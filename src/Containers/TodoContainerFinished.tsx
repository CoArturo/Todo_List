import { useEffect, useState } from 'react'
import TodoPresentation from '../Presentations/TodoPresentation';

interface Todo {
  idUser: number;
  id: number;
  description: string;
  status: boolean;
  date: string;
  tagId: number;
}

export function FinishedTask() {

  const [Items, setItems] = useState<Todo[]>([])
  const url = `https://my-json-server.typicode.com/CoArturo/MonckAPI/tareas`
  
  const fecthApi = function() {
    fetch(url)
    .then((resp) => resp.json())
    .then((resp) => setItems(resp))
  }

  useEffect(()=>{
    fecthApi()
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

  return <TodoPresentation
    todos={penddingItems}
    onToggleStatus={handleToggleStatus}
  />
}

export default FinishedTask