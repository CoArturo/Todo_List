import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import "../Styles/Nav.css";

const links = [
  {
    name: "Pending",
    href: "./pending"
  },
  {
    name: "Finished",
    href: "./finished"
  },
  {
    name: "Login",
    href: "./login"
  }
]


export default function BasicMenu() {
  
  const [estilo, setEstilo] = useState('show');

  // Función para cambiar el estilo
  
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  const cambiarEstilo = () => {
    // Cambia el estilo según el estado actual
    setEstilo(estilo === 'show' ? 'hide' : 'show');
  };

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
  

    return (
      <>
        <button className='menu' onClick={cambiarEstilo}><i className="fa-solid fa-bars"></i></button>
        <nav className={estilo}>
          <ol className={estilo}>
            {links.map(link => (
              <Link className={estilo} to={link.href}><link rel="stylesheet" href=".name" />{link.name}</Link>
            ))}
            <li className='cerrar' onClick={cambiarEstilo}>
              Cerrar
            </li>
            <li id='logout' className={estilo}>Log Out</li>
          </ol>
        </nav>
      </>
    );
  }
