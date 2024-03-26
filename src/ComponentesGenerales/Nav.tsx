import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Nav.css";
import { UserContext } from '../Context/UserContext';
import { themes } from '../Styles/Style-Components/Theme';
import Cookies from 'universal-cookie';

const links = [
  {
    id: 1,
    name: "Pending",
    href: "./pending"
  },
  {
    id: 2,
    name: "Finished",
    href: "./finished"
  },
  {
    id: 3,
    name: "Login",
    href: "./"
  },
  {
    id: 4,
    name: "Profile",
    href: "./profile"
  }
]

export default function BasicMenu() {
  
  const { setUsuario, usuario } = useContext(UserContext)
  const [estilo, setEstilo] = useState('show');
  const cookies = new Cookies();
  const navigate = useNavigate();
  // Función para cambiar el estilo

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
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

  useEffect(() => {
    if (windowSize.width > 600 && estilo == 'hide') {
      cambiarEstilo()
      console.log("Hola")
    }
  }, [windowSize]);

  const estiloUsuario = usuario.theme === 'Tema1' ? themes.Tema1 : themes.Tema2;
  const estiloUsuario2 = themes.Tema1;

    return (
      <>
        <button className='menu' onClick={cambiarEstilo}>
          <i className="fa-solid fa-bars"></i>
        </button>
        <nav
          style={estiloUsuario} 
          className={estilo}>
          <ol className={estilo}>
            {links.map(link => (
              <Link key={link.id} className={estilo} to={link.href}><link rel="stylesheet" href=".name" />{link.name}</Link>
            ))}
            <li className='cerrar' onClick={cambiarEstilo}>
              Cerrar
            </li>
            <li id='logout' 
              onClick={logOut} 
              className={estilo}>
                Log Out
            </li>
          </ol>
        </nav>
      </>
    );
  }
