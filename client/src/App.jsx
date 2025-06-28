import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Routes,Route,BrowserRouter} from 'react-router-dom'  
import './App.css'
import Home from './Pages/Home'

export default function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
    </Routes>
    </BrowserRouter>
  )
}