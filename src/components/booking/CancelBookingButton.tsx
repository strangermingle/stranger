'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cancelBookingAction } from '@/actions/booking.actions'
import { toast } from 'sonner'
import { Loader2, XCircle } from 'lucide-react'
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface CancelBookingButtonProps {
  bookingRef: string
  eventName: string
  refundAmount: number
}

export function CancelBookingButton({ bookingRef, eventName, refundAmount }: CancelBookingButtonProps) {
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  async function handleCancel() {
    setIsPending(true)
    try {
      const result = await cancelBookingAction(bookingRef)
      if (result.success) {
        toast.success('Booking cancelled successfully')
        router.refresh()
      } else {
        toast.error(result.error || 'Failed to cancel booking')
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button 
          className="flex items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-black text-rose-600 transition hover:bg-rose-100 disabled:opacity-50"
          disabled={isPending}
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4" />}
          Cancel Booking
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-3xl border-zinc-200 dark:border-zinc-800">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-black">Cancel your booking?</AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-500">
            You are about to cancel your booking for <span className="font-bold text-zinc-900 dark:text-zinc-100">{eventName}</span>. 
            {refundAmount > 0 && (
               <span className="mt-2 block rounded-lg bg-emerald-50 p-3 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
                  A full refund of <span className="font-black">₹{refundAmount}</span> will be initiated to your original payment method.
               </span>
            )}
            This action cannot be undone. Your tickets will be voided immediately.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6">
          <AlertDialogCancel className="rounded-xl border-zinc-200 font-bold dark:border-zinc-800">Keep Booking</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleCancel}
            className="rounded-xl bg-rose-600 font-bold text-white hover:bg-rose-700"
          >
            Confirm Cancellation
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
