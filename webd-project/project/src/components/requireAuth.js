import React from 'react';
import { useAuth } from './auth';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function RequireAuth({role,children}) {


    const user = useSelector(state=>state.user);

    if(!role.includes(user?.type))
    {
        return <Navigate to="/" ></Navigate>
    }

  return children;
}
