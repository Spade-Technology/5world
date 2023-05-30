import React from 'react'

export function Section({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={'mx-0 overflow-hidden md:px-6 xl:px-0 ' + className}>{children}</div>
}
