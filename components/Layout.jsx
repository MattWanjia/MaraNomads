import Nav from './Nav'
import React from 'react'
import Meta from './Meta'

const Layout = ({children}) => {
  return (
    <>
    <Meta/>
    <Nav/>
    {children}
    </>
  )
}

export default Layout
