'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

export interface AgoraCallParams {
  appId: string
  channelName: string
  token: string
  account: string
}

export function useAgoraVoiceCall({ appId, channelName, token, account }: AgoraCallParams) {
  const [isConnected, setIsConnected] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [remoteAudioActive, setRemoteAudioActive] = useState(false)
  const [localVolume, setLocalVolume] = useState(0)
  const [remoteVolume, setRemoteVolume] = useState(0)
  const [networkQuality, setNetworkQuality] = useState<'good' | 'fair' | 'poor'>('good')
  const [error, setError] = useState<string | null>(null)

  // Audio permission and autoplay states
  const [isMicBlocked, setIsMicBlocked] = useState(false)
  const [isMicPermissionGranted, setIsMicPermissionGranted] = useState<boolean | null>(null)
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false)

  const clientRef = useRef<any>(null)
  const localAudioTrackRef = useRef<any>(null)
  const remoteAudioTracksRef = useRef<Map<string | number, any>>(new Map())

  const leaveCall = useCallback(async () => {
    try {
      if (localAudioTrackRef.current) {
        localAudioTrackRef.current.stop()
        localAudioTrackRef.current.close()
        localAudioTrackRef.current = null
      }
      if (clientRef.current) {
        await clientRef.current.leave()
        clientRef.current = null
      }
      remoteAudioTracksRef.current.clear()
      setIsConnected(false)
    } catch (err: any) {
      console.warn('Error leaving voice call:', err)
    }
  }, [])

  const toggleMute = useCallback(async () => {
    if (!localAudioTrackRef.current) return
    const nextMuted = !isMuted
    await localAudioTrackRef.current.setEnabled(!nextMuted)
    setIsMuted(nextMuted)
  }, [isMuted])

  // Resume playback if mobile browser blocks audio autoplay
  const resumeAutoplay = useCallback(async () => {
    try {
      const AgoraRTC = (await import('agora-rtc-sdk-ng')).default
      if (typeof (AgoraRTC as any).resumeAudioContext === 'function') {
        await (AgoraRTC as any).resumeAudioContext()
      }
      remoteAudioTracksRef.current.forEach((track) => {
        try {
          track.play()
        } catch {}
      })
      setIsAutoplayBlocked(false)
    } catch (err) {
      console.warn('Failed to resume autoplay audio:', err)
    }
  }, [])

  // Explicitly prompt/retry microphone initialization
  const requestMicPermission = useCallback(async () => {
    try {
      const AgoraRTC = (await import('agora-rtc-sdk-ng')).default
      if (!clientRef.current) return

      const micTrack = await AgoraRTC.createMicrophoneAudioTrack({
        encoderConfig: 'high_quality_stereo',
        AEC: true,
        ANS: true,
        AGC: true,
      })

      localAudioTrackRef.current = micTrack
      await clientRef.current.publish([micTrack])

      setIsMicBlocked(false)
      setIsMicPermissionGranted(true)
      setError(null)
    } catch (micErr: any) {
      console.warn('[VoiceCall] Retry mic permission failed:', micErr)
      setIsMicBlocked(true)
      setIsMicPermissionGranted(false)
      setError('Microphone access denied. Please allow microphone permissions in your browser.')
    }
  }, [])

  useEffect(() => {
    if (!appId) {
      setError('Agora App ID is missing on the backend. Please verify AGORA_APP_ID is configured in Vercel environment variables.')
      return
    }
    if (!channelName || !token) {
      setError('Agora session credentials missing. Unable to join audio call.')
      return
    }

    let isMounted = true

    async function initAudioCall() {
      try {
        console.log('[AgoraVoiceCall] Connecting to voice channel:', channelName, 'with App ID:', appId?.slice(0, 6) + '...')
        const AgoraRTC = (await import('agora-rtc-sdk-ng')).default

        // Autoplay failure callback
        AgoraRTC.onAudioAutoplayFailed = () => {
          if (isMounted) {
            setIsAutoplayBlocked(true)
          }
        }

        const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })
        clientRef.current = client

        // Enable volume indicators for voice reactivity
        client.enableAudioVolumeIndicator()
        client.on('volume-indicator', (volumes) => {
          if (!isMounted) return
          volumes.forEach((v) => {
            if (v.uid === account || String(v.uid) === String(account)) {
              setLocalVolume(v.level)
            } else {
              setRemoteVolume(v.level)
            }
          })
        })

        // Remote peer published audio
        client.on('user-published', async (user, mediaType) => {
          if (mediaType === 'audio') {
            try {
              const remoteTrack = await client.subscribe(user, 'audio')
              remoteAudioTracksRef.current.set(user.uid, remoteTrack)
              remoteTrack.play()
              if (isMounted) setRemoteAudioActive(true)
            } catch (trackErr) {
              console.warn('[VoiceCall] Subscribing/playing remote audio failed:', trackErr)
              if (isMounted) setIsAutoplayBlocked(true)
            }
          }
        })

        client.on('user-unpublished', (user, mediaType) => {
          if (mediaType === 'audio') {
            remoteAudioTracksRef.current.delete(user.uid)
            if (isMounted) setRemoteAudioActive(false)
          }
        })

        client.on('network-quality', (stats) => {
          if (!isMounted) return
          const uplink = stats.uplinkNetworkQuality
          if (uplink <= 2) setNetworkQuality('good')
          else if (uplink <= 4) setNetworkQuality('fair')
          else setNetworkQuality('poor')
        })

        // Join room with dynamic token and account identifier
        await client.join(appId, channelName, token, account)

        if (isMounted) {
          setIsConnected(true)
          setError(null)
        }

        // Capture microphone with noise suppression and echo cancellation
        try {
          const micTrack = await AgoraRTC.createMicrophoneAudioTrack({
            encoderConfig: 'high_quality_stereo',
            AEC: true,
            ANS: true,
            AGC: true,
          })
          localAudioTrackRef.current = micTrack

          // Publish local mic
          await client.publish([micTrack])

          if (isMounted) {
            setIsMicBlocked(false)
            setIsMicPermissionGranted(true)
          }
        } catch (micErr: any) {
          console.warn('[VoiceCall] Failed to initialize microphone track:', micErr)
          if (isMounted) {
            setIsMicBlocked(true)
            setIsMicPermissionGranted(false)
            setError('Microphone access is blocked. Please allow microphone permission in your browser.')
          }
        }
      } catch (err: any) {
        console.error('[VoiceCall] Failed to join call:', err)
        if (isMounted) {
          setError(err.message || 'Unable to connect to audio room')
        }
      }
    }

    initAudioCall()

    return () => {
      isMounted = false
      leaveCall()
    }
  }, [appId, channelName, token, account, leaveCall])

  return {
    isConnected,
    isMuted,
    toggleMute,
    leaveCall,
    remoteAudioActive,
    localVolume,
    remoteVolume,
    networkQuality,
    error,
    isMicBlocked,
    isMicPermissionGranted,
    isAutoplayBlocked,
    resumeAutoplay,
    requestMicPermission,
  }
}
