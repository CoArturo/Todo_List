import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext"; 
import {Input, Button} from '@mui/joy';
import { MenuItem, FormControl, Select, SelectChangeEvent,  InputLabel  } from '@mui/material';
import  '../Styles/Profile.css'
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";


export const Profile: React.FC = () => {
    
    const {usuario} = useContext(UserContext)
    const [Id, setId] = useState<number>(Number)
    const [User, setUser] = useState<string>('')
    const [Name, setName] = useState<string>('')
    const [Clave, setClave] = useState<string>('')
    const [Theme, setTheme] = useState<string>('')

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const cookies = new Cookies();
    useEffect(()=>{
        if(!cookies.get('jwt'))
          {
            navigate('/')
          }
      }, [])

    const handleChange = (event: SelectChangeEvent<typeof Theme>) => {
        setTheme(event.target.value);
        console.log(Theme)
    };
    
    const handleClose = () => {
    setOpen(false);
    };

    const handleOpen = () => {
    setOpen(true);
    };


    useEffect(()=>{
        console.log(usuario)
    },[])

    return(
    <div className="containerP">

        {usuario ? (
        <div className="controlesP">
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
                defaultValue={usuario.theme}
                label="Tema"
                onChange={handleChange}
              >
                <MenuItem value='Tema1'>Tema1</MenuItem>
                <MenuItem value='Tema2'>Tema2</MenuItem>
                <MenuItem value='Tema3'>Tema3</MenuItem>
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