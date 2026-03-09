'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { resolveReportAction } from '@/actions/admin.actions'
import { toast } from 'sonner'

export default function ReportActionButton({ 
  reportId, 
  status, 
  children,
  variant,
  className
}: { 
  reportId: string, 
  status: 'resolved' | 'dismissed', 
  children: React.ReactNode,
  variant?: 'default' | 'outline' | 'ghost' | 'danger',
  className?: string
}) {
  const [loading, setLoading] = useState(false)

  const handleAction = async () => {
    setLoading(true)
    try {
      const note = window.prompt(`Note for ${status}:`)
      if (note === null) {
        setLoading(false)
        return;
      }
      const result = await resolveReportAction(reportId, status, note || 'Processed by admin')
      if (result.success) {
        toast.success(`Report ${status}`)
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
