import React, { useEffect, useState, useContext  } from "react";
import {Input, Button} from '@mui/joy';
import { User } from "../Interfaces/User";
import { Alert } from '@mui/material';
import { UserContext} from '../Context/UserContext';
import Cookies from "universal-cookie";
import  { useNavigate }  from 'react-router-dom';
import '../Styles/Login.css'


export const LoginContainer: React.FC = () => {

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [User, setUser] = useState<any>(null)

  const [animate, setAnimate] = useState(false);
  
  const { setUsuario } = useContext(UserContext)
  const { usuario } = useContext(UserContext)
  
  const navigate = useNavigate();
  const cookies = new Cookies();

  // Llave secre para token
  // const key: string = 'ponatencionnotienesenemigos';

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
      console.log(cookies)
      setUsuario(usuario)
  },[])

  const login = (jwt_token:any) =>{
    cookies.set("jwt", jwt_token)
    setUser(jwt_token)
    cookies.get("jwt_authorization", jwt_token)
  }

  const generearToken = () =>{
    const token = 'regregpoefwjfewp';
    login(token)
  }


  const obtenerData = async() =>{
    await handleLogin()
    console.log(cookies)
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
        console.log(usuario)
        generearToken()
        navigate("/pending")
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
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