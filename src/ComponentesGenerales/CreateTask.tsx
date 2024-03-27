import React, { useEffect, useState } from 'react'
import { UserContext } from '../Context/UserContext'
import { Todo } from '../Interfaces/Todo'
import { Alert, MenuItem, FormControl, Select, SelectChangeEvent,  InputLabel  } from '@mui/material';
import { Input, Button } from '@mui/joy';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import '../Styles/TaskCreate.css'

export const CreateTask = () => {

    const navigate = useNavigate();
    const cookies = new Cookies();

    const {usuario} = React.useContext(UserContext)

    const [error, setError] = useState<string>('')

    const [id, setId] = useState<number>(Number)
    const [descripcion, setDescripcion] = useState<string>('')
    const [today, setToday] = useState<string>('')
    const [tagId, setTagId] = useState<number>(Number)

    const date = new Date()

    const year = date.getFullYear();
    const month = date.getMonth() + 1; 
    const day = date.getDate();

    
    const [todo, setTodo] = useState<Todo>({
        idUser: usuario.id,
        id: id,
        description: descripcion,
        status: true,
        date: `${day}-${month}-${year}`,
        tagId: tagId,
    })

    const fetchTasks = async () => {
        const url = 'https://my-json-server.typicode.com/CoArturo/MonckAPI/tareas';
        try {
          const response = await fetch(url)
          const data: Todo[] = await response.json();
          setId(data.length + 1)

        } catch (error) {
          setError('Error al hacer fetch')
        }
    };

    const createTask = async() =>{
        try {
          const url = 'https://my-json-server.typicode.com/CoArturo/MonckAPI/tareas'
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(todo)
          })
    
          if (response.ok) {
            console.log('Tarea creada exitosamente')

          } else {
            setError('Error al registrar la tarea')
          }
          
        } catch (error) {
            setError('Error al registrar la tarea')
        }
      }

      useEffect(()=>{
        if(!cookies.get('jwt'))
          {
            navigate('/')
          }
        setToday(`${day}-${month}-${year}`)
        fetchTasks()
      },[])


      const [open, setOpen] = useState(false);
      const [animado, setanimado] = useState(false);
      const [estilo2, setEstilo2] = useState('esconder');

    const handleChange = (event: SelectChangeEvent<typeof tagId>) => {
        const value = parseInt(event.target.value as string, 10);
        setTagId(value);
        console.log(tagId)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

  return (
    <div className="containerTask">
      <div className="controlesT">
        <h2>Task</h2>
        <div className="inputs">
          <Input
            type="text"
            placeholder="Descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

        <div className="inputs">
          <Input
            type="text"
            placeholder="Date"
            value={today}
          />
        </div>

        <div className="inputs">
          <div>
            <FormControl sx={{minWidth: 120 }}>
              <InputLabel id="demo-controlled-open-select-label">Tema</InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                defaultValue={1}
                label="Tag"
                onChange={handleChange}
              >
                <MenuItem value={1}>Daily routine</MenuItem>
                <MenuItem value={2}>School</MenuItem>
                <MenuItem value={3}>Work</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <Alert className={animado ? 'fadeIn' : 'alertT'} severity="success">This is a success Alert.</Alert>
      <Button onClick={createTask}>CREAR TAREA</Button>
      </div>
    </div>
  )
}
