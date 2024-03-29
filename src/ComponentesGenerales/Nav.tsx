import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../Context/UserContext';
import "../Styles/Nav.css";
import '../Styles/Style-Components/Themes.css'
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
    name: "Create Task",
    href: "./createtask",
    icono: "fa-solid fa-clipboard"
  },
  {
    id: 4,
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
  };

  const logOut = () =>{
    cambiarEstilo()
    setEstilo("hide")
    setTimeout(()=>{
      cookies.remove("jwt")
      navigate('/')
      window.location.reload()
    }, 1000)
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
    if (windowSize.width > 600 && estilo == 'hide' && cookies.get('jwt')) {
      setEstilo("show")
    }else if(windowSize.width < 600){
      setEstilo("hide")
    }
  }, [windowSize]);

  const estiloUsuario = usuario.theme === 'Dark' ? 'Dark' 
                        : usuario.theme === 'Light' ? 'Light'  
                        : 'Default'
    return (
      <>
        <button className='menu' onClick={cambiarEstilo}>
          <i className="fa-solid fa-bars"></i>
        </button>
        <nav
          className={`${estilo} ${estiloUsuario}`}>
          <ol className={estiloUsuario}>
            {links.map(link => (
              <li key={link.id}>
                <Link className={`${estilo} ${estiloUsuario}`} key={link.id} to={link.href}>
                   <link rel="stylesheet" href=".name" />
                   <span className='navName'>
                     <i className={`iconosLinks ${link.icono} ${estiloUsuario}`}></i> 
                     <span className={`linkA ${estilo} ${estiloUsuario}`}>
                       {link.name}
                     </span>
                   </span> 
                 </Link>
              </li>
            ))}
            <li className='cerrar' onClick={cambiarEstilo}>
                <span className={`cerrarC ${estilo} ${estiloUsuario}`} >
                  <i className={`fa-solid fa-x ${estiloUsuario}`}></i>
                  <span className={`${estiloUsuario}`}>Cerrar</span>
                </span> 
            </li>
            <li 
              onClick={logOut} 
              className={`logout ${estilo} ${estiloUsuario}`}>
                <div className={`logoutA`}>
                  <i className="fa-solid fa-right-from-bracket"></i>
                  <p>Log Out</p>
                </div>
            </li>
          </ol>
        </nav>
      </>
    );
  }
