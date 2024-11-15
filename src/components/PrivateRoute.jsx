import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';

export const PrivateRoute = () => {
    const { loggedIn, checkinStatus } = useAuthStatus();
    if ( checkinStatus ) {
        return <h3>Loading...</h3>
    }
  return loggedIn ? <Outlet /> : <Navigate to='/home' />
}
