import * as React from 'react';
import { Modal, Fade, Box, Typography, Stack, MenuItem, FormControl, Select, SelectChangeEvent,  InputLabel   } from '@mui/material';
import {Input, FormLabel, Checkbox, Button } from '@mui/joy';
import { Todo } from '../Interfaces/Todo';
import { UserContext } from '../Context/UserContext';
import Cookies from "universal-cookie";
import { useNavigate } from 'react-router-dom';

import { themes } from '../Styles/Style-Components/Theme';

  interface ModalPresentationProps {
    open: boolean;
    handleClose: () => void;
    dataTask: Todo;
  }
  
  const ModalPresentation: React.FC<ModalPresentationProps> = ({ open, handleClose, dataTask }) => 
  {

    const navigate = useNavigate();
    const cookies = new Cookies();

    React.useEffect(()=>{
      if(!cookies){navigate('/')}
    },[])


    
    const {usuario} = React.useContext(UserContext)
    const [modal, setmodal] = React.useState<boolean>(Boolean)
    const [Descripcion, setDescripcion] = React.useState<string>('');
    const [Fecha, setFecha] = React.useState<string>('');
    const [Etiqueta, setEtiqueta] = React.useState<number>(Number);
    const [Estado, setEstado] = React.useState<boolean>(Boolean);
    const [Id, setId] = React.useState<number>(0);
    const [todo, setTodo] = React.useState<Todo>({
      idUser: 0,
      id: 0,
      description: '',
      status: false,
      date: '',
      tagId: 0
    });
    
    const estiloUsuario = usuario.theme === 'Tema1' ? themes.Tema1 : usuario.theme === 'Tema2' ? themes.Tema2 : {};
    
    React.useEffect(()=>{
      setTodo(dataTask)
    },[modal])

    const modalCambio = () => {
      setmodal(!modal)
    }

    //Manejo de fecha
    const today = new Date();

    const maxDate = new Date();
    maxDate.setFullYear(today.getFullYear() + 10);

    const todayString = formatDate(today);
    const maxDateString = formatDate(maxDate);

    function formatDate(date:any) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${day}-${month}-${year}`;
    }
    //Fin manejo de fecha

    const descripcionInput = (event:any) => {
      setDescripcion(event.target.value)
    }

    const fechaInput = (event:any) => {
      setFecha(event.target.value)
    }
    
    const estadoInput = (event:any, status: boolean) => {
      setEstado(status)
    }

    const handleSubmit = () => {
      setTodo({
        idUser: usuario.id,
        id: Id,
        description: Descripcion,
        status: Estado,
        date: Fecha,
        tagId: Etiqueta
      });
      
      fetch('https://my-json-server.typicode.com/CoArturo/MonckAPI/tareas/1',{ method: 'PUT', body: JSON.stringify(todo) });
    }

    const [abrir, setAbrir] = React.useState(false);

    const handleChange = (event: SelectChangeEvent<typeof Etiqueta>) => {
      const value = parseInt(event.target.value as string, 10);
      setEtiqueta(value);
      console.log(Etiqueta)
    };

    const handleClose2 = () => {
      setAbrir(false);
    };

    const handleOpen = () => {
      setAbrir(true);
    };


    return ( 
      <Modal
      style={estiloUsuario}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={()=>{handleClose(); modalCambio();}}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
      >
          
          <Fade in={open}>
            <Box 
              sx={{
                position: 'absolute' as const,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                minWidth: 300,
                color: '#000',
              }}
              >
              
              
              <div key={todo.id}>
                <h3>
                  Tarea: {todo.description} Id: {todo.id}
                </h3>
                <Typography id="spring-modal-description" sx={{ mt: 2 }}>
                  <FormLabel>Descripcion</FormLabel>
                  <Input  
                    defaultValue={todo.description}
                    onChange={descripcionInput}
                    />
                </Typography>

                <Typography id="spring-modal-description" sx={{ mt: 2 }}>
                  <FormLabel>Fecha</FormLabel>
                  <Input
                    type="date" 
                    defaultValue={todo.date}
                    onChange={fechaInput}
                    slotProps={{
                      input: {
                        min: todayString,
                        max: maxDateString,
                      },
                    }}
                  />
                </Typography>
                
                <Typography id="spring-modal-description" sx={{ mt: 2 }}>
                <FormLabel>Estado</FormLabel>
                  <Checkbox 
                    label={todo.status == true ? 'Terminada' : 'En proceso'} 
                    defaultChecked={todo.status == true}
                    onChange={(e) => estadoInput(e, e.target.checked)}
                    />
                </Typography>
              
                <Typography id="spring-modal-description" sx={{ mt: 1 }}>
                  <FormLabel>Etiqueta</FormLabel>
                    <FormControl sx={{ mb: 2,mt: 2, minWidth: 110 }}>
                      <InputLabel id="demo-controlled-open-select-label">Tag</InputLabel>
                      <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={abrir}
                        onClose={handleClose2}
                        onOpen={handleOpen}
                        className="selectP"
                        defaultValue={1}
                        label="Tag"
                        onChange={handleChange}
                      >
                        <MenuItem value={1}>Daily routine</MenuItem>
                        <MenuItem value={2}>School</MenuItem>
                        <MenuItem value={3}>Work</MenuItem>
                      </Select>
                    </FormControl>
                               
                </Typography>

                <div>
          </div>
              

                <Stack direction="row" spacing={3}>
                  <Typography id="spring-modal-description" sx={{ mt: 3 }}>
                    <Button sx={{ ml: 10 }} onClick={() => {handleClose(); handleSubmit();}}>SUBIR</Button>
                  </Typography>
                </Stack>
              </div>

            </Box>
          </Fade>
        </Modal>
    );
  };



export default ModalPresentation;

