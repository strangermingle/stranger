'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { suspendUserAction } from '@/actions/admin.actions'
import { toast } from 'sonner'

export default function UserActionButton({ 
  userId, 
  action, 
  value,
  children,
  variant,
  className
}: { 
  userId: string, 
  action: 'suspend' | 'unsuspend', 
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
        const until = window.prompt('Suspend until (YYYY-MM-DD) or leave empty for permanent:')
        result = await suspendUserAction(userId, reason || 'No reason provided', until || undefined)
      } else if (action === 'unsuspend') {
        toast.error('Unsuspend not implemented via this action yet')
        setLoading(false)
        return;
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
