import React from 'react'
import Header from './header'
import Footer from './footer'

function Page({ children, web2 = false, darkweb2 = false }: { children: React.ReactNode; web2?: boolean; darkweb2?: boolean }) {
  const web2Active = web2 || darkweb2
  const darkModeActive = darkweb2 || !web2
  const bodyClassName = 'w-full text-vdao-dark ' + (!darkweb2 && !web2 && ' bg-vdao-deep')

  return (
    <>
      <Header web2={web2Active} dark={darkModeActive} />
      <div className={bodyClassName}>{children}</div>
      {/* <Footer /> */}
    </>
  )
}

export default Page
