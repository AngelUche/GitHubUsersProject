import React from 'react';
import { Dashboard as Dashboardx, Login, PrivateRoute, AuthWrapper, Error } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <AuthWrapper>
    <BrowserRouter>
      <Routes>
          <Route index path='/' element={
          <PrivateRoute>
           <Dashboardx />
         </PrivateRoute>
         }>
           </Route>
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Error />} />
    </Routes>
    </BrowserRouter>
    </AuthWrapper>
  );
}

export default App;
