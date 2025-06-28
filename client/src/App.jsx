import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Routes,Route,BrowserRouter} from 'react-router-dom'  
import './App.css'
import Home from './Pages/Home'

export default function App(){
  return (
    <div className='Main_Class'>
      <img class="bg-Image" src='./Components_CSS/Bg1.png'></img>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  )
}