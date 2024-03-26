import { useEffect, useState } from 'react'
import TodoPresentation from '../Presentations/TodoPresentation';
import { Todo } from "../Interfaces/Todo";
import {CircularProgress} from '@mui/material';

export function FinishedTask() {

  const [Items, setItems] = useState<Todo[]>([])
  const [loading, setLoading] = useState(false);
  const url = `https://my-json-server.typicode.com/CoArturo/MonckAPI/tareas`
  
  const fecthApi = async function() {
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const obtenerData = async()=> {
    setLoading(true);
    await fecthApi()
    setLoading(false);
  }

  useEffect(()=>{
    obtenerData() 
  }, [])

  const handleToggleStatus = (id: number) => {
    const updatedItems = Items.map(item =>
      item.id === id ? { ...item, status: !item.status } : item
    );
    setItems(updatedItems);
    console.log(Items)
    console.log(Items)
  };

  const penddingItems = Items.filter(item => item.status == true && item.idUser == 1);

  return (

    <>
      {loading ? (
        <div className="loadingCards">
          <CircularProgress className="load"/>
        </div>  
        ) : (
        <>
          <TodoPresentation
          todos={penddingItems}
          onToggleStatus={handleToggleStatus}
          />
        </>
        )
      }
    </>
  )
}

export default FinishedTask