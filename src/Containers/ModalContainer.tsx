import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import ModalPresentation from '../Presentations/ModalPresentation';

interface Todo {
    idUser: number;
    id: number;
    description: string;
    status: boolean;
    date: string;
    tagId: number;
  }

  interface Tags {
    id: number,
    name: string
  }

  interface ModalContainerProps {
    openModal: boolean;
    handleOpenModal: () => void;
    taskId: number;
  }

  const ModalContainer: React.FC<ModalContainerProps> = ({ openModal, handleOpenModal, taskId }) => {
    const [open, setOpen] = useState(false);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [tags, setTags] = useState<Tags[]>([]);
  
    const handleOpen = () => {
      fetchData(taskId)
      setOpen(true);
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
  
    const fetchData = (taskId: number) => {
      fetch(`https://my-json-server.typicode.com/CoArturo/MonckAPI/tareas/${taskId}`)
        .then((resp) => resp.json())
        .then((data: Todo) => {
          setTodos([data]);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };

    const fetchTags = () => {
      fetch(`https://my-json-server.typicode.com/CoArturo/MonckAPI/tags`)
        .then((resp) => resp.json())
        .then((datas: Tags) => {
          setTags([datas]);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };
  
    useEffect(() => {
      fetchTags();
      fetchData(taskId);
    }, []);
  
    return (
      <div>
        <ModalPresentation open={open} handleClose={()=>handleClose()} dataTask={todos} tags={tags}/>
      </div>
    );
  };

  export default ModalContainer;