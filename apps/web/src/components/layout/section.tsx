import React from 'react'

export function Section({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={'md:x-6 mx-0 overflow-hidden xl:px-0 ' + className}>{children}</div>
}
