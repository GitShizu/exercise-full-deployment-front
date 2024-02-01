import { useState } from 'react'
import './App.scss'
import { NavLink, Route, Routes } from 'react-router-dom'
import HomePage from './components/HomePage'
import AlbumsPage from './components/AlbumsPage'
import MusiciansPage from './components/MusiciansPage'
import AlbumDetails from './components/AlbumDetails'
import MusicianDetails from './components/MusicianDetails'
import NotFound from './components/NotFound'
import SignUser from './components/SignUser'
import { useUser } from '../context/UserContext'

function App() {

  const { user } = useUser()

  return (
    <section className='app-wrapper'>
      <nav>
        <menu>
          {user &&
            <>
              <li>
                <NavLink className={'navlink'} to={'/'} element={<HomePage />} >Home</NavLink>
              </li>
              <li>
                <NavLink className={'navlink'} to={'/albums'} element={<AlbumsPage />} >Albums</NavLink>
              </li>
              <li>
                <NavLink className={'navlink'} to={'/musicians'} element={<MusiciansPage />} >Musicians</NavLink>
              </li>
            </>

          }
          {!user &&
            <>
              <li>
                <NavLink className={'navlink'} to={'/signup'} element={<SignUser type='signup' />} >Sign Up</NavLink>
              </li>
              <li>
                <NavLink className={'navlink'} to={'/login'} element={<SignUser type='login' />} >Log In</NavLink>
              </li>
            </>}


        </menu>
      </nav>
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'/signup'} element={<SignUser type='signup' />} />
        <Route path={'/login'} element={<SignUser type='login' />} />
        <Route path={'/musicians'} >
          <Route index element={<MusiciansPage />} />
          <Route path={':slug'} element={<MusicianDetails />} />
        </Route>
        <Route path={'/albums'}>
          <Route index element={<AlbumsPage />} />
          <Route path={':slug'} element={<AlbumDetails />} />
        </Route>
        <Route path={'*'} element={<NotFound />} />
      </Routes>
    </section>
  )
}

export default App
