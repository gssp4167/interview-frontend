import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
    <ul className="nav">
        <li className="nav-item">
            <a className="nav-link" href="index.html">
                <i className="icon-grid menu-icon"></i>
                <span className="menu-title">Dashboard</span>
            </a>
        </li>
        <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#ui-student" aria-expanded="false"
                aria-controls="ui-student">
                <i className="icon-layout menu-icon"></i>
                <span className="menu-title">Interviews</span>
                <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="ui-student">
                <ul className="nav flex-column sub-menu">
                    <li className="nav-item"> <Link className="nav-link" to="create">Create</Link></li>
                    <li className="nav-item"> <Link className="nav-link" to="allinterviews">Manage</Link></li>
                </ul>
            </div>
        </li>
       

    </ul>
</nav>
  )
}

export default Sidebar