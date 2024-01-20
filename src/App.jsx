import { useState } from 'react'
import './App.scss'
import { NavLink, Route, Routes } from 'react-router-dom'
import HomePage from './components/HomePage'
import AlbumsPage from './components/AlbumsPage'
import MusiciansPage from './components/MusiciansPage'
import AlbumDetails from './components/AlbumDetails'
import MusicianDetails from './components/MusicianDetails'

function App() {
  const [count, setCount] = useState(0)

  return (
    <section className='app-wrapper'>
      <nav>
        <menu>
          <li>
            <NavLink className={'navlink'} to={'/'} element={<HomePage />} >Home</NavLink>
          </li>
          <li>
            <NavLink className={'navlink'} to={'/albums'} element={<AlbumsPage />} >Albums</NavLink>
          </li>
          <li>
            <NavLink className={'navlink'} to={'/musicians'} element={<MusiciansPage />} >Musicians</NavLink>
          </li>
        </menu>
      </nav>
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'/musicians'} element={<MusiciansPage />} />
        <Route path={'/musicians/:id'} element={<MusicianDetails/>}/>
        <Route path={'/albums'} element={<AlbumsPage />} />
        <Route path={'/albums/:id'} element={<AlbumDetails/>}/>
        
      </Routes>
    </section>
  )
}

export default App
