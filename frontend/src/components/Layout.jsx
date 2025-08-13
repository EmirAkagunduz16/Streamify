import Sidebar from './Sidebar'
import NavBar from './NavBar'
import React from 'react'

const Layout = ({children, showSideBar}) => {
  return (
    <div className='min-h-screen'>
      <div className='flex'>
        {showSideBar && <Sidebar />}

        <div className='flex-1 flex flex-col'>
          <NavBar />
          <main className='flex-1 overflow-y-auto'>
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Layout