import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
  } from "react-router-dom";
import { startChecking } from '../actions/auth';

import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

  const dispatch = useDispatch();
  const { checking, uid } = useSelector( state => state.auth );

  
  // REVISAR SI ESTA AUTENTICADO
  useEffect(() => {

    dispatch( startChecking() );
    
  }, [dispatch])
  
  if( checking ){
    return <h5>Espere...</h5>
  }

  return (
    <BrowserRouter>
        <Routes>

            <Route path="/login" element={ 
                <PublicRoute uid={ uid }>
                  <LoginScreen />
                </PublicRoute>
              } 
             />

            <Route path='/*' 
              element={ 
                <PrivateRoute uid={ uid }>
                  <CalendarScreen />
                </PrivateRoute> 
                }  
            />

            <Route path="/*" element={ <Navigate to="/" /> } /> {/* Redireccionar al Home si no existe la url */}
        </Routes>
    </BrowserRouter>
  )
};
