import React, { useEffect, useState } from 'react'
import TodoPresentation from '../Presentations/TodoPresentation';

interface Todo {
  idUser: number;
  id: number;
  description: string;
  status: boolean;
  date: string;
  tagId: number;
}

export function App() {

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
  };

  const penddingItems = Items.filter(item => item.status == false && item.idUser == 1);

  return <TodoPresentation
    todos={Items}
    onToggleStatus={handleToggleStatus}
  />
}

export default App