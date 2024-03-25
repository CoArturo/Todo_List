import React from 'react'

import BasicMenu from '../ComponentesGenerales/Nav'
import PendingTask from '../Containers/TodoContainer'
import FinishedTask from '../Containers/TodoContainerFinished'
import LoginContainer from '../ComponentesGenerales/Login'; 
import { BrowserRouter, Routes, Route } from "react-router-dom";


export const Main = () => {
  return (

        <BrowserRouter>
    <div className='container'>
            <BasicMenu />   
            <Routes>
                <Route path='/pending' element={<PendingTask/>}/>
                <Route path='/finished' element={<FinishedTask/>}/>
                <Route path='/login' element={<LoginContainer/>}/>
            </Routes>
    </div>
        </BrowserRouter>

  )
}
