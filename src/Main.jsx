import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './Elements/Sidebar';
import TopBar from './Elements/TopBar';
import Dashboard from './Pages/Dashboard';
import CreateInterview from './Pages/CreateInterview';
import ManageInterviews from './Pages/ManageInterviews';
import EditInterview from './Pages/EditInterview';

const Main = () => {



  return (
    <>

      <div className="container-scroller">

        <TopBar />





        <div className="container-fluid page-body-wrapper">

          <Sidebar />

          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/create' element={<CreateInterview />} />
            <Route path='/allinterviews' element={<ManageInterviews />} />
            <Route path='/editinterview' element={<EditInterview />} />
          </Routes>

        </div>

      </div>


    </>
  )
}

export default Main