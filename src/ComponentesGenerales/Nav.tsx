import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../Context/UserContext';
import { themes } from '../Styles/Style-Components/Theme';
import "../Styles/Nav.css";
import Cookies from 'universal-cookie';


const links = [
  {
    id: 1,
    name: "Pending",
    href: "./pending",
    icono: "fa-solid fa-clock"
  },
  {
    id: 2,
    name: "Finished",
    href: "./finished",
    icono: "fa-solid fa-check"
  },
  {
    id: 3,
    name: "Profile",
    href: "./profile",
    icono: "fa-solid fa-user"
  }
]

export default function BasicMenu() {

  
  
  const { usuario } = useContext(UserContext)
  const [estilo, setEstilo] = useState('hide');
  const cookies = new Cookies();
  const navigate = useNavigate();
  
  
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  // Función para cambiar el estilo
  
  const cambiarEstilo = () => {
    setEstilo(estilo === 'show' ? 'hide' : 'show');
    console.log(estilo)
  };

  const logOut = () =>{
    cookies.remove("jwt")
    console.log(cookies)
    navigate('/')
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (windowSize.width > 600 && estilo == 'hide') {
    cambiarEstilo()
    console.log("Hola")
  }

  useEffect(() => {
    if (windowSize.width > 600 && estilo == 'hide' && cookies.get('jwt')) {
      cambiarEstilo()
      console.log("Hola")
    }else{
      setEstilo('hide')
    }
  }, [windowSize]);

  const estiloUsuario = usuario.theme === 'Tema1' ? themes.Tema1 : usuario.theme === 'Tema2' ? themes.Tema2 : {};
    return (
      <>
        <button className='menu' onClick={cambiarEstilo}>
          <i className="fa-solid fa-bars"></i>
        </button>
        <nav
          style={estiloUsuario}
          className={estilo}>
          <ol style={estiloUsuario} className={estilo}>
            {links.map(link => (
              <Link style={estiloUsuario} key={link.id} className={estilo} to={link.href}>
                <link rel="stylesheet" href=".name" />
                <span className='navName' style={estiloUsuario}>
                  <i style={estiloUsuario} className={link.icono}></i> 
                  {link.name}
                </span> 
              </Link>
            ))}
            <li style={estiloUsuario} className='cerrar' onClick={cambiarEstilo}>
                <span className='navName' style={estiloUsuario}>
                  <i style={estiloUsuario} className="fa-solid fa-x"></i>
                  Cerrar
                </span> 
            </li>
            <li style={estiloUsuario} id='logout' 
              onClick={logOut} 
              className={estilo}>
                Log Out
            </li>
          </ol>
        </nav>
      </>
    );
  }
