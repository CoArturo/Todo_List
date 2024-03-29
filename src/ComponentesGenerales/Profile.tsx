import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext"; 
import {Input, Button} from '@mui/joy';
import { MenuItem, FormControl, Select, SelectChangeEvent,  InputLabel  } from '@mui/material';
import  '../Styles/Profile.css'
import { useNavigate } from "react-router-dom";
import { User } from "../Interfaces/User";
import { key } from "./NadieMeVe";
import Cookies from "universal-cookie";
import CryptoJS from 'crypto-js';


export const Profile: React.FC = () => {
    
  const [Id, setId] = useState<number>(Number)
  const [User, setUser] = useState<string>('')
  const [Name, setName] = useState<string>('')
  const [Clave, setClave] = useState<string>('')
  const [Theme, setTheme] = useState<string>('')
  
  const [open, setOpen] = useState(false);
  
  const {usuario, setUsuario} = useContext(UserContext)

  const estiloUsuario = usuario.theme === 'Dark' ? 'Dark' 
                        : usuario.theme === 'Light' ? 'Light'  
                        : 'Default'
  
  const navigate = useNavigate();
  
  const cookies = new Cookies();

    
    useEffect(()=>{
      revisarCookies()
    }, [])

    const revisarCookies = () =>{
      if(!cookies.get('jwt'))
      {
        navigate('/')
      }else{
        const data = cookies.get("jwt")
        const descryptedData =  CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8)
        const descryptedObject:User = JSON.parse(descryptedData)
        setUsuario(descryptedObject, null, 2);
      }
  }

    const handleChange = (event: SelectChangeEvent<typeof Theme>) => {
        setTheme(event.target.value);
    };
    
    const handleClose = () => {
    setOpen(false);
    };

    const handleOpen = () => {
    setOpen(true);
    };

    return(
    <div className={`containerP ${estiloUsuario}`}>
        {usuario ? (
        <div className={`controlesP ${estiloUsuario}`}>
            <h2>Profile</h2>
            <div className="inputs">
                <Input
                id="InputReferencia"
                type="text"
                placeholder="User"
                defaultValue={usuario.user}
                onChange={(e) => setUser(e.target.value)}
                />
          </div>
          <div className="inputs">
                <Input
                type="text"
                placeholder="Name"
                defaultValue={usuario.name}
                onChange={(e) => setName(e.target.value)}
                />
          </div>
          <div className="inputs">
                <Input
                type="text"
                placeholder="Password"
                defaultValue={usuario.clave}
                onChange={(e) => setClave(e.target.value)}
                />
          </div>
          <div className="inputs">
          <div>
            <FormControl sx={{ m: 0, minWidth: 110 }}>
              <InputLabel id="demo-controlled-open-select-label">Tema</InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                className="selectP"
                defaultValue={Theme}
                label="Tema"
                onChange={handleChange}
              >
                <MenuItem value='Dark'>Dark</MenuItem>
                <MenuItem value='Light'>Light</MenuItem>
                <MenuItem value='Default'>Default</MenuItem>
              </Select>
            </FormControl>
          </div>
          </div>
          <Button className="mandar">GUARDAR</Button>
        </div>
        ) : (
            <p>Please login</p>
        )}
    </div>
    )
}

export default Profile