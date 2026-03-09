'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { suspendEventAction, toggleFeaturedEvent } from '@/actions/admin.actions'
import { toast } from 'sonner'

export default function EventActionButton({ 
  eventId, 
  action, 
  value,
  children,
  variant,
  className
}: { 
  eventId: string, 
  action: 'suspend' | 'feature', 
  value?: any,
  children: React.ReactNode,
  variant?: 'default' | 'outline' | 'ghost' | 'danger',
  className?: string
}) {
  const [loading, setLoading] = useState(false)

  const handleAction = async () => {
    setLoading(true)
    try {
      let result;
      if (action === 'suspend') {
        const reason = window.prompt('Reason for suspension:')
        if (reason === null) {
          setLoading(false)
          return;
        }
        result = await suspendEventAction(eventId, reason || 'No reason provided')
      } else if (action === 'feature') {
        result = await toggleFeaturedEvent(eventId, value)
      }

      if (result?.success) {
        toast.success('Action successful')
      } else {
        toast.error(result?.error || 'Action failed')
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setLoading(false)
    }
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
