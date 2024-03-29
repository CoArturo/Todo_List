import BasicMenu from '../ComponentesGenerales/Nav'
import PendingTask from '../Containers/TodoContainer'
import FinishedTask from '../Containers/TodoContainerFinished'
import LoginContainer from '../ComponentesGenerales/Login';
import Profile from '../ComponentesGenerales/Profile'; 
import { BrowserRouter, Routes, Route, Router, parsePath } from "react-router-dom";
import { UserContext, UserProvider } from '../Context/UserContext';
import Registro from '../ComponentesGenerales/Registro';
import { useContext, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { CreateTask } from '../ComponentesGenerales/CreateTask';

export const Main = () => {

  return (
      <UserProvider> 
          <BrowserRouter>
            <div className='container'>
             {window.location.pathname !== "/" && window.location.pathname !== "/register" &&  <BasicMenu />}
              <Routes>
                  <Route path='/pending' element={<PendingTask/>}/>
                  <Route path='/finished' element={<FinishedTask/>}/>
                  <Route path='/profile' element={<Profile />}/>
                  <Route path='/createtask' element={<CreateTask />}/>
                  <Route path='/register' element={<Registro />}/>
                  <Route path='/' element={<LoginContainer />} />
              </Routes>
            </div>
          </BrowserRouter>
      </UserProvider>

  )
}
