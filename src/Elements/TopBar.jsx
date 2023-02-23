import React from 'react'

const TopBar = () => {
  return (
   
    <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
    <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <a className="navbar-brand brand-logo mr-5" href="index.html"><img src="../images/logo-mini.svg" className="mr-2" alt="logo" /></a>
        <a className="navbar-brand brand-logo-mini" href="index.html"><img src="../images/logo-mini.svg" alt="logo" /></a>
    </div>
    <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
            <span className="icon-menu"></span>
        </button>
    </div>
</nav>
    
  )
}

export default TopBar