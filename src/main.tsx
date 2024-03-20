import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Containers/TodoContainer.tsx'
import './index.css'
import LoginContainer from './ComponentesGenerales/Login.tsx'
import  StyledMenu  from './ComponentesGenerales/Nav.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <StyledMenu /> */}
    <App />
  </React.StrictMode>,
)
