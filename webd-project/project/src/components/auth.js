import React, { useContext } from 'react'
import { createContext, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../redux/userSlice';

const AuthContext = createContext(null);

export default function Auth({children}) {

    const user = useSelector(state=>state.user);

    const dispatch = useDispatch();

    const login = (user)=> {
        dispatch(addUser(user));
    }

    const logout =() =>
    {
        dispatch(addUser(null));

    }

  return (
    <AuthContext.Provider value={{user, login, logout}} >
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth =()=>
{
    return useContext(AuthContext);
}
