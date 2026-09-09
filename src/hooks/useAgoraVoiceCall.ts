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

  const clientRef = useRef<any>(null)
  const localAudioTrackRef = useRef<any>(null)

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

  useEffect(() => {
    if (!appId || !channelName || !token) return

    let isMounted = true

    async function initAudioCall() {
      try {
        const AgoraRTC = (await import('agora-rtc-sdk-ng')).default

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
            const remoteTrack = await client.subscribe(user, 'audio')
            remoteTrack.play()
            if (isMounted) setRemoteAudioActive(true)
          }
        })

        client.on('user-unpublished', (user, mediaType) => {
          if (mediaType === 'audio') {
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

        // Capture microphone with noise suppression and echo cancellation
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
          setIsConnected(true)
          setError(null)
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
  }
}
