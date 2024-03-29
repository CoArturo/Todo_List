import React, { useEffect, useState, useContext  } from "react";
import {Input, Button} from '@mui/joy';
import CryptoJS from 'crypto-js';
import { User } from "../Interfaces/User";
import { Alert } from '@mui/material';
import { UserContext} from '../Context/UserContext';
import Cookies from "universal-cookie";
import  { useNavigate }  from 'react-router-dom';
import '../Styles/Login.css'
import { key } from "./NadieMeVe";


export const LoginContainer: React.FC = () => {

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [User, setUser] = useState<any>(null)

  const [animate, setAnimate] = useState(false);
  
  const { usuario, setUsuario } = useContext(UserContext)
  
  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleClick = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 5000);
  };

  useEffect(()=>{
    if(cookies.get('jwt'))
    {
      setUser(cookies.get("jwt"))
      navigate('/pending')
    }
  },[])

  const login = (jwt_token:any) =>{
    cookies.set("jwt", jwt_token)
    cookies.get("jwt", jwt_token)
  }

  const generearToken = (userToken: User) =>{
    const objetoUsuario:User = userToken;
    const jsonString = JSON.stringify(objetoUsuario)
    const encrytedData = CryptoJS.AES.encrypt(jsonString, key).toString();

    const token = encrytedData;
    login(token)
  }


  const obtenerData = async() =>{
    await handleLogin()
  }

  useEffect(()=>{
    handleClick()
    setTimeout(() => {
      setError('')
    }, 5000);
  },[error])

    
  const handleLogin = async () => {

    const url = "https://my-json-server.typicode.com/CoArturo/MonckAPI/usuarios"

    try {
      const response = await fetch(url);
      const data: User[] = await response.json();
      const user = data.find(
        (u) => u.user === username && u.clave === password
      );

      if (user) {
        setUsuario(user)
        console.log(user)
        generearToken(user)
        navigate("/pending")
        window.location.reload()
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      setError("Error al iniciar sesión");
    }
  };

  return (
    <div className="containerLogin">
    {User == null ? (
      <div className="controlesL">
        <div className="login">
          <h1>Login</h1>
          
          <div className="inputs">
            <Input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="inputs">
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <small onClick={()=>navigate('/register')} className="accont">Need account?</small>
          
          <Button onClick={obtenerData}>Iniciar sesión</Button>
          <div className="alerta">
            {error && 
              <Alert className={animate ? 'fadeIn' : ''} severity="error">{error}</Alert>
            }
          </div>

        </div>
      </div>
    ) 
    : 
    (
      <div>
        <Button onClick={()=>navigate("/pending")}>TAREAS</Button>
      </div>
    )}
    </div>
    
  );
};


export default LoginContainer;