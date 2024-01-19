import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { NavLink, Route, Routes } from 'react-router-dom'
import HomePage from './components/HomePage'
import AlbumsPage from './components/AlbumsPage'
import MusiciansPage from './components/MusiciansPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <section className='app-wrapper'>
      <nav>
        <menu>
          <li>
            <NavLink to={'/'} element={<HomePage />} >Home</NavLink>
          </li>
          <li>
            <NavLink to={'/albums'} element={<AlbumsPage />} >Albums</NavLink>
          </li>
          <li>
            <NavLink to={'/musicians'} element={<MusiciansPage />} >Musicians</NavLink>
          </li>
        </menu>
      </nav>
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'/musicians'} element={<MusiciansPage />} />
        <Route path={'/albums'} element={<AlbumsPage />} />
      </Routes>
    </section>
  )
}

export default App
