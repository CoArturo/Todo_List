import React, { useEffect, useState  } from "react";
import { Input, Button } from '@mui/joy';
import { MenuItem, FormControl, Select, SelectChangeEvent,  InputLabel  } from '@mui/material';
import { User } from "../Interfaces/User";
import '../Styles/Registro.css'
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export const Registro: React.FC = () => {

  const [error, setError] = useState<string>('')
  const [id, setId] = useState<number>(Number)
  const [username, setUsername] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [clave, setClave] = useState<string>('')
  const [theme, setTheme] = useState<string>('')

  const navigate = useNavigate();

  const [usuario, setUsuario] = useState<User>({
    id: id,
    user: username,
    name: name,
    clave: clave,
    theme: theme
  })

  const cookies = new Cookies();

  useEffect(() => {
    if(!cookies){navigate('/')}
  }, [])
  

  const revisarUsuario =  async() =>{
    const url = 'https://my-json-server.typicode.com/CoArturo/MonckAPI/usuarios';

    try {

      const response = await fetch(url)
      const data: User[] = await response.json();
      setId(data.length + 1)
      console.log(id)
      const user = data.find(
        (u) => u.user === username
      );
      if(user){
        setError('El nombre de usuario no esta disponible')
        console.error("Error al iniciar sesión:", error);
      }else {
        await registrarUsuario();
      }

    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  }

  const registrarUsuario = async() =>{
    try {
      const url = 'https://my-json-server.typicode.com/CoArturo/MonckAPI/usuarios'
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({usuario})
      })

      if (response.ok) {
        console.log('Usuario registrado exitosamente')
      } else {
        console.error('Error al registrar un usuario')
        setError('Error al registrar el usuario')
      }
      
    } catch (error) {
      console.error('Error al registrar un usuario')
    }
  }

  //Logica del select de Material UI
  const [open, setOpen] = useState(false);

  const handleChange = (event: SelectChangeEvent<typeof theme>) => {
    setTheme(event.target.value);
    console.log(theme)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className="containerRegistro">
      <div className="controlesR">
        <h2>Registro</h2>
        <div className="inputs">
          <Input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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
            value={clave}
            onChange={(e) => setClave(e.target.value)}
          />
        </div>

        <div className="inputs">
          <div>
            <FormControl sx={{ m: 0, minWidth: 120 }}>
              <InputLabel id="demo-controlled-open-select-label">Tema</InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={theme}
                label="Tema"
                onChange={handleChange}
              >
                <MenuItem value='Tema1'>Tema1</MenuItem>
                <MenuItem value='Tema2'>Tema2</MenuItem>
                <MenuItem value='Tema3'>Tema3</MenuItem>
              </Select>
            </FormControl>
          </div>
        <small onClick={()=>navigate('/')} className="register">Have account? Log-In</small>
        </div>
      <Button onClick={revisarUsuario}>REGISTRARSE</Button>
      </div>
    </div>
  )
}

export default Registro