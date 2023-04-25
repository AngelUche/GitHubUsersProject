import React from 'react';
import { Dashboard as Dashboardx, Login, PrivateRoute, AuthWrapper, Error } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index path='/' element={<Dashboardx />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Error />} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
