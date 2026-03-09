'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { TicketIcon, InfoIcon, ShieldCheckIcon, AlertCircleIcon } from 'lucide-react'
import { JoinWaitlistButton } from '../booking/JoinWaitlistButton'

// Define exactly what this component needs based on the schemas and ticket tiers
interface Tier {
  id: string
  name: string
  price: number
  description: string | null
  max_per_booking: number
  available_qty?: number // From v_ticket_availability join
}

interface EventTicketPanelProps {
  eventId: string
  ticketingMode: 'platform' | 'external' | 'free' | 'rsvp' | 'none'
  externalTicketUrl: string | null
  ticketTiers: Tier[]
}

export function EventTicketPanel({
  eventId,
  ticketingMode,
  externalTicketUrl,
  ticketTiers,
}: EventTicketPanelProps) {
  const router = useRouter()
  const supabase = createClient()
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleQuantityChange = (tierId: string, value: number) => {
    setSelectedQuantities(prev => ({
      ...prev,
      [tierId]: value,
    }))
  }

  const handleCheckout = async () => {
    setErrorMsg(null)

    // Check auth
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
      router.push(`/login?next=/events/${eventId}`)
      return
    }

    // Identify if trying to proceed
    if (ticketingMode === 'external') {
      if (externalTicketUrl) {
        window.open(externalTicketUrl, '_blank')
      }
      return
    }

    if (ticketingMode === 'free' || ticketingMode === 'rsvp') {
      setIsProcessing(true)
      // Call action to generate free booking (mocking transition)
      await new Promise(r => setTimeout(r, 1000))
      router.push('/dashboard')
      return
    }

    if (ticketingMode === 'platform') {
      const selectedTiers = Object.entries(selectedQuantities).filter(([_, qty]) => qty > 0)
      
      if (selectedTiers.length === 0) {
        setErrorMsg("Please select at least one ticket.")
        return
      }

      setIsProcessing(true)
      // Normally, persist items to draft booking then redirect to payment flow
      // e.g., createBookingAction({ eventId, items: selectedTiers }) -> redirect(/checkout/${ref})
      await new Promise(r => setTimeout(r, 1000)) // Simulation
      
      // Temporary manual route
      alert('Checkout flow triggered! Needs booking repository connection hookup in next steps.')
      setIsProcessing(false)
    }
  }

  // Calculate totals
  let totalItems = 0
  let totalPrice = 0
  if (ticketingMode === 'platform') {
    Object.entries(selectedQuantities).forEach(([tierId, qty]) => {
      const tier = ticketTiers.find(t => t.id === tierId)
      if (tier && qty > 0) {
        totalItems += qty
        totalPrice += tier.price * qty
      }
    })
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sticky top-24">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Tickets</h2>
        <TicketIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
      </div>

      {errorMsg && (
        <div className="mb-6 flex items-start gap-3 rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
          <AlertCircleIcon className="h-5 w-5 shrink-0" />
          <p>{errorMsg}</p>
        </div>
      )}

      {/* RENDER MODES */}
      <div className="space-y-6">
        {ticketingMode === 'none' && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Tickets are currently unavailable for this event.
          </p>
        )}

        {ticketingMode === 'external' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Tickets for this event are sold through an external provider.
            </p>
            <button
              onClick={handleCheckout}
              disabled={!externalTicketUrl}
              className="w-full rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              Get Tickets
            </button>
          </div>
        )}

        {(ticketingMode === 'free' || ticketingMode === 'rsvp') && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This event is completely free to attend, but registration is required.
            </p>
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              {isProcessing ? 'Processing...' : 'Reserve Spot'}
            </button>
          </div>
        )}

        {ticketingMode === 'platform' && (
          <>
            {ticketTiers.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">No ticket tiers currently available.</p>
            ) : (
              <div className="space-y-4 divide-y divide-gray-100 dark:divide-zinc-800">
                {ticketTiers.map(tier => {
                  const available = tier.available_qty ?? 100 // fallback
                  const isSoldOut = available <= 0
                  const currentQty = selectedQuantities[tier.id] || 0
                  const maxSelectable = Math.min(tier.max_per_booking, available)

                  return (
                    <div key={tier.id} className="pt-4 first:pt-0">
                      <div className="flex items-start justify-between">
                        <div className="pr-4">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">{tier.name}</h4>
                          <p className="font-medium text-gray-900 dark:text-gray-300">₹{tier.price}</p>
                          {tier.description && (
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{tier.description}</p>
                          )}
                        </div>
                        
                        <div className="shrink-0 flex flex-col items-end gap-2 text-right">
                          {isSoldOut ? (
                            <>
                              <span className="text-sm font-black text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100 dark:bg-rose-900/30 dark:text-rose-400">
                                Sold Out
                              </span>
                              <JoinWaitlistButton 
                                eventId={eventId} 
                                ticketTierId={tier.id} 
                                tierName={tier.name} 
                              />
                            </>
                          ) : (
                            <div className="flex items-center gap-2 border border-gray-200 rounded-xl p-1 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800">
                               <button 
                                 type="button"
                                 onClick={() => handleQuantityChange(tier.id, Math.max(0, currentQty - 1))}
                                 disabled={currentQty === 0}
                                 className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm hover:bg-gray-50 disabled:opacity-50 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                               >
                                 <span className="text-gray-600 font-bold dark:text-gray-300">-</span>
                               </button>
                               <span className="w-6 text-center text-sm font-black text-gray-900 dark:text-white">
                                 {currentQty}
                               </span>
                               <button 
                                 type="button"
                                 onClick={() => handleQuantityChange(tier.id, Math.min(maxSelectable, currentQty + 1))}
                                 disabled={currentQty === maxSelectable}
                                 className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm hover:bg-gray-50 disabled:opacity-50 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                               >
                                 <span className="text-gray-600 font-bold dark:text-gray-300">+</span>
                               </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Total Footer */}
            {ticketTiers.length > 0 && (
              <div className="mt-6 border-t border-gray-200 pt-6 dark:border-zinc-800 space-y-4">
                <div className="flex items-center justify-between text-lg font-bold">
                  <span className="text-gray-900 dark:text-white">Total ({totalItems})</span>
                  <span className="text-gray-900 dark:text-white">₹{totalPrice}</span>
                </div>
                
                <button
                  onClick={handleCheckout}
                  disabled={totalItems === 0 || isProcessing}
                  className="w-full flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                >
                  {isProcessing ? 'Processing...' : 'Check out securely'}
                </button>
                
                <p className="flex items-center justify-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <ShieldCheckIcon className="h-4 w-4" />
                  Payments processed securely via Razorpay
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
