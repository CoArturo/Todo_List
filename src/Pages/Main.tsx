import React from 'react'

import BasicMenu from '../ComponentesGenerales/Nav'
import PendingTask from '../Containers/TodoContainer'
import FinishedTask from '../Containers/TodoContainerFinished'
import LoginWrapper from '../ComponentesGenerales/Login';
import Profile from '../ComponentesGenerales/Profile'; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from '../Context/UserContext';


export const Main = () => {
  return (
      <UserProvider> 
          <BrowserRouter>
            <div className='container'>
              <BasicMenu />   
              <Routes>
                  <Route path='/pending' element={<PendingTask/>}/>
                  <Route path='/finished' element={<FinishedTask/>}/>
                  <Route path='/profile' element={<Profile />}/>
                  <Route path='/' element={<LoginWrapper/>} />
              </Routes>
            </div>
          </BrowserRouter>
      </UserProvider>

  )
}
