'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Database
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function AuditLogTable({ logs }: { logs: any[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-gray-50/50 dark:bg-zinc-800/50 text-gray-400 font-black uppercase tracking-widest text-[10px]">
            <tr>
              <th className="px-8 py-5">Timestamp</th>
              <th className="px-8 py-5">Actor</th>
              <th className="px-8 py-5">Action / Entity</th>
              <th className="px-8 py-5 text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-zinc-800 font-body">
            {logs.map((log) => (
              <React.Fragment key={log.id}>
                <tr className={cn(
                  "hover:bg-gray-50/20 dark:hover:bg-zinc-800/10 transition-colors group cursor-pointer",
                  expandedId === log.id && "bg-indigo-50/30 dark:bg-indigo-900/10"
                )}
                onClick={() => setExpandedId(expandedId === log.id ? null : log.id)}
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-gray-400 font-medium whitespace-nowrap">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(log.created_at).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-black text-xs">
                        {log.actor?.username?.substring(0, 2).toUpperCase() || 'S'}
                      </div>
                      <span className="font-bold text-gray-900 dark:text-zinc-100 italic">@{log.actor?.username || 'system'}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1">
                       <span className="font-black text-[10px] uppercase tracking-[0.2em] text-indigo-500">{log.action_type?.replace(/_/g, ' ')}</span>
                       <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                          <Database className="w-3 h-3" />
                          <span className="opacity-80 capitalize">{log.entity_type} / {String(log.entity_id).substring(0, 8)}...</span>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 hover:bg-white dark:hover:bg-zinc-800 rounded-xl transition-all shadow-sm group-hover:shadow-md">
                      {expandedId === log.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 opacity-40" />}
                    </button>
                  </td>
                </tr>
                {expandedId === log.id && (
                  <tr className="bg-indigo-50/10 dark:bg-indigo-900/5 animate-in slide-in-from-top-1 duration-200">
                    <td colSpan={4} className="px-8 py-8 border-t border-indigo-100/50 dark:border-indigo-900/20">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Initial State</h4>
                          <pre className="p-4 bg-white dark:bg-zinc-950 rounded-2xl border border-gray-100 dark:border-zinc-800 text-[11px] font-mono text-gray-600 dark:text-gray-400 overflow-x-auto shadow-inner max-h-[300px]">
                            {log.old_values ? JSON.stringify(log.old_values, null, 2) : '// No previous state recorded'}
                          </pre>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">Post-Mutation State</h4>
                          <pre className="p-4 bg-white dark:bg-zinc-950 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 text-[11px] font-mono text-indigo-600/80 dark:text-indigo-400/80 overflow-x-auto shadow-inner max-h-[300px]">
                            {log.new_values ? JSON.stringify(log.new_values, null, 2) : '// Mutation completed'}
                          </pre>
                        </div>
                      </div>
                      {log.metadata && Object.keys(log.metadata).length > 0 && (
                        <div className="mt-8">
                           <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Auxiliary Context</h4>
                           <div className="flex flex-wrap gap-2">
                             {Object.entries(log.metadata).map(([key, val]) => (
                               <Badge key={key} variant="outline" className="bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 lowercase text-[10px] font-medium border-dashed">
                                 <span className="opacity-50 mr-1">{key}:</span> {String(val)}
                               </Badge>
                             ))}
                           </div>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

import React from 'react'
