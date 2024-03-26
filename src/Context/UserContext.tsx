import React, { createContext, useState, useContext, ReactNode } from 'react';
import {User} from '../Interfaces/User'

export const UserContext = createContext<any>({
    id: 0,
    user: '',
    name: '',
    clave: '',
    theme: ''
  });

  export const UserProvider = ({children}:any) => {
    
    const [usuario, setUsuario] = useState<User>({
      id: 0,
      user: '',
      name: '',
      clave: '',
      theme: ''
    })

    return (
        <UserContext.Provider value={{
          usuario,
          setUsuario
        }}>
          {children}
        </UserContext.Provider>
    );
};

