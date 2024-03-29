import { useContext, useEffect, useState } from 'react'
import TodoPresentation from '../Presentations/TodoPresentation';
import { Todo } from "../Interfaces/Todo";
import {CircularProgress} from '@mui/material';
import { UserContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import { themes } from '../Styles/Style-Components/Theme';
import { key } from '../ComponentesGenerales/NadieMeVe';
import { User } from '../Interfaces/User';
import Cookies from 'universal-cookie';
import CryptoJS from 'crypto-js';
import '../Styles/Cards.css'

export function PendingTask() {

  const [Items, setItems] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const url = `https://my-json-server.typicode.com/CoArturo/MonckAPI/tareas`;
  
  const { usuario, setUsuario } = useContext(UserContext)

  const navigate = useNavigate();
  const cookies = new Cookies();

  const fecthApi = async function() {
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      setItems(data);
    } catch (error) {
      
    }
  }

  const obtenerData = async()=> {
    setLoading(true);
    await fecthApi()
    setLoading(false);
  }

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
      obtenerData()
    }
  }

  const handleToggleStatus = (id: number) => {
    const updatedItems = Items.map(item =>
      item.id === id ? { ...item, status: !item.status } : item
    );
    setItems(updatedItems);
  };

  const penddingItems = Items.filter(item => item.status == false && item.idUser == usuario.id);

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
          titulo='Tareas pendientes'
          />
        </>
        )
      }
    </>
  )
}

export default PendingTask