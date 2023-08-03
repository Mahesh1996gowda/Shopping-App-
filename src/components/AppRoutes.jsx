import React from 'react'
import { Routes,Route } from 'react-router-dom';
import Home from './Home';
import Category from './Category';

const AppRoutes = () => {
  return (
    
        <Routes>
            <Route path="/" element={<Category/>} />
            <Route path="/:category" element={<Category/>} />
        </Routes>
  )
}

export default AppRoutes
