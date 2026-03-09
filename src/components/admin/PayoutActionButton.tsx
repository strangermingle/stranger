'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { processPayoutAction } from '@/actions/admin.actions'
import { toast } from 'sonner'
import { CheckCircle } from 'lucide-react'

export default function PayoutActionButton({ 
  payoutId,
  children,
  variant,
  className
}: { 
  payoutId: string, 
  children: React.ReactNode,
  variant?: 'default' | 'outline' | 'ghost' | 'danger',
  className?: string
}) {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleAction = async () => {
    if (!window.confirm('Are you sure you want to process this settlement?')) return;
    
    setLoading(true)
    try {
      const result = await processPayoutAction(payoutId)
      if (result.success) {
        toast.success(`Payout processed successfully`)
        setDone(true)
      } else {
        toast.error(result.error || 'Action failed')
      }
    } catch (error) {
      toast.error('An error occurred during payout processing')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="flex items-center justify-end gap-1.5 text-xs font-bold text-green-600 uppercase tracking-widest bg-green-50 dark:bg-green-900/10 px-3 py-1.5 rounded-lg border border-green-100 dark:border-green-900/20">
        <CheckCircle className="w-4 h-4" />
        Processed
      </div>
    )
  }

  return (
    <Button 
      size="sm" 
      variant={variant} 
      onClick={handleAction} 
      disabled={loading}
      className={className}
    >
      {children}
    </Button>
  )
}
