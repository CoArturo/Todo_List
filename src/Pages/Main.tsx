import BasicMenu from '../ComponentesGenerales/Nav'
import PendingTask from '../Containers/TodoContainer'
import FinishedTask from '../Containers/TodoContainerFinished'
import LoginContainer from '../ComponentesGenerales/Login';
import Profile from '../ComponentesGenerales/Profile'; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from '../Context/UserContext';
import Registro from '../ComponentesGenerales/Registro';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { CreateTask } from '../ComponentesGenerales/CreateTask';

export const Main = () => {

  const cookies = new Cookies();
  const [cookie, setCookie] = useState(false);

  useEffect(()=>{
    if(cookies.get('jwt'))
    {
      setCookie(true)
    }else{
      setCookie(false)
    }
  },[cookie])


  return (
      <UserProvider> 
          <BrowserRouter>
            <div className='container'>
            <BasicMenu /> 
              <Routes>
                  <Route path='/pending' element={<PendingTask/>}/>
                  <Route path='/finished' element={<FinishedTask/>}/>
                  <Route path='/profile' element={<Profile />}/>
                  <Route path='/register' element={<Registro />}/>
                  <Route path='/createtask' element={<CreateTask />}/>
                  <Route path='/' element={<LoginContainer />} />
              </Routes>
            </div>
          </BrowserRouter>
      </UserProvider>

  )
}
