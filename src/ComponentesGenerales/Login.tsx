import React, { useState } from "react";
import { useCookies } from "react-cookie";
import {Input, Button} from '@mui/joy';
import '../Styles/Login.css'
import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";
import {themes} from '../Styles/Style-Components/Theme'

interface User {
  id: number;
  user: string;
  name: string;
  clave: string;
  theme: string;
}

const LoginContainer: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies();
  
  const ThemeContext = React.createContext({
    theme: 'light',
    toggleTheme: () => {}
  });


  if(cookies)
    {
    console.log(cookies)
    }
    
    const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://my-json-server.typicode.com/CoArturo/MonckAPI/usuarios"
      );
      const data: User[] = await response.json();

      const user = data.find(
        (u) => u.user === username && u.clave === password
      );

      if (user) {
        const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6${encodeURIComponent(
          user.user
        )}&password=${encodeURIComponent(user.clave)}`;

        alert("Usuario existente:" + token)
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 1);

        setCookie("jwt", token, { expires: expirationDate, path: "/" });

        console.log(token)

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

          <Button onClick={handleLogin}>Iniciar sesión</Button>
          {error && <div>{error}</div>}
        </div>

      </div>
    </div>
  );
};

export default LoginContainer;