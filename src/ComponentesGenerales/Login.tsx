import React, { useEffect, useState, createContext, useContext  } from "react";
import {Input, Button} from '@mui/joy';
import { User } from "../Interfaces/User";
import { UserContext, UserProvider } from '../Context/UserContext';
import  Redirect, { Navigate, useNavigate }  from 'react-router-dom';
import '../Styles/Login.css'
import Cookies from "universal-cookie";
import jwt from 'jsonwebtoken';
import ModalContainer from "../Containers/ModalContainer";


export const LoginContainer: React.FC = () => {


  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [User, setUser] = useState<any>(null)

  const [UsuarioA, setUsuarioA] = useState<User>({
    id: 0,
    user: '',
    name: '',
    clave: '',
    theme: ''
  });

  
  
  const { setUsuario } = useContext(UserContext)
  const { usuario } = useContext(UserContext)
  
  const navigate = useNavigate();

  const userInfo: User = UsuarioA;
  const key: string = 'ponatencionnotienesenemigos';


  const cookies = new Cookies();

  useEffect(()=>{
      if(cookies.get('jwt'))
      {
        setUser(cookies.get("jwt"))
        navigate('/pending')
      }
      console.log(cookies)
      setUsuario(usuario)
  },[])


  const logOut = () =>{
    setUser(null)
    cookies.remove("jwt")
    console.log(User)
    console.log(cookies)
  }

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
    setLoading(true);
    await handleLogin()
    setLoading(false);
    console.log(cookies)
    console.log(User)
  }
    
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
        generearToken()

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

          <Button onClick={obtenerData}>Iniciar sesión</Button>
          {error && <div>{error}</div>}
        </div>
      </div>
    ) 
    : 
    (
      <div>
        <Button onClick={logOut}>Borrar token</Button>
      </div>
    )}
    </div>
    
  );
};


export default LoginContainer;