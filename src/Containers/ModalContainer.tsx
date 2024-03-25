import { useEffect, useState } from "react";
import {CircularProgress, Box} from '@mui/material';
import ModalPresentation from '../Presentations/ModalPresentation';
import '../Styles/Cards.css'


interface Todo {
    idUser: number;
    id: number;
    description: string;
    status: boolean;
    date: string;
    tagId: number;
  }

  interface ModalContainerProps {
    openModal: boolean;
    handleOpenModal: () => void;
    taskId: number;
  }

  const ModalContainer: React.FC<ModalContainerProps> = ({ openModal, handleOpenModal, taskId }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [todos, setTodos] = useState<Todo>({
      idUser: 0,
      id: 0,
      description: '',
      status: true,
      date: '',
      tagId: 0,
    });
  
    const handleOpen = async () => { 
      setLoading(true); 
      setOpen(true);
      await fetchData(taskId);
      setLoading(false); 
  };
  

    useEffect(() => {
      if (openModal)  {
        handleOpen();
      }
    }, [openModal]);
  
    const handleClose = () => {
      handleOpenModal();
      setOpen(false);
    };
  
    const fetchData = async (taskId: number) => {
      try {
        const url = `https://my-json-server.typicode.com/CoArturo/MonckAPI/tareas/${taskId}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('La respuesta no es ok');
        }
        const data: Todo = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching de datos:', error);
      }
    };
  
    return (
      <div>
        {loading ? (
              <div className="loading">
                <CircularProgress className="load"/>
              </div>
            ) : (
              <div>
                <ModalPresentation open={open} handleClose={handleClose} dataTask={todos} />
              </div>
            )}
      </div>
    );
  };

  export default ModalContainer;