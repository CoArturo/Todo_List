import React, { useEffect, useState, createContext, useContext  } from "react";
import {Input, Button} from '@mui/joy';
import { User } from "../Interfaces/User";

export const Registro: React.FC = () => {

  const [error, setError] = useState<string>('')
  const [id, setId] = useState<number>(Number)
  const [username, setUsername] = useState<string>('JuanDev')
  const [name, setName] = useState<string>('')
  const [clave, setClave] = useState<string>('')
  const [theme, setTheme] = useState<string>('')

  const [usuario, setUsuario] = useState<User>({
    id: 0,
    user: '',
    name: '',
    clave: '',
    theme: ''
  })

  useEffect(() => {
    registerUser()
  }, [])
  

  const registerUser =  async() =>{
    const url = 'https://my-json-server.typicode.com/CoArturo/MonckAPI/usuarios';

    try {

      const response = await fetch(url)
      const data: User[] = await response.json();
      const user = data.find(
        (u) => u.user === username
      );
      if(user){
        setError('El nombre de usuario no esta disponible')
        console.error("Error al iniciar sesión:", error);
      }

    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }

    // try {
    //   const response = await fetch(url);
    //   const data: User[] = await response.json();
    //   const user = data.find(
    //     (u) => u.user === username && u.clave === password
    //   );

    //   if (user) {
    //     setUsuario(user)
    //     generearToken()

    //   } else {
    //     setError("Usuario o contraseña incorrectos");
    //   }
    // } catch (error) {
    //   console.error("Error al iniciar sesión:", error);
    //   setError("Error al iniciar sesión");
    // }
  }


  return (
    <div>Registro</div>
  )
}

export default Registro