'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { approveHostAction } from '@/actions/admin.actions'
import { toast } from 'sonner'

export default function HostActionButton({ 
  hostId, 
  approved, 
  variant, 
  children,
  className
}: { 
  hostId: string, 
  approved: boolean, 
  variant?: 'default' | 'outline' | 'ghost' | 'danger', 
  children: React.ReactNode,
  className?: string
}) {
  const [loading, setLoading] = useState(false)

  const handleAction = async () => {
    setLoading(true)
    try {
      const result = await approveHostAction(hostId, approved)
      if (result.success) {
        toast.success(approved ? 'Host approved' : 'Host approval revoked')
      } else {
        toast.error(result.error || 'Action failed')
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
