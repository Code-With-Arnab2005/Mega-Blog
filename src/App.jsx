import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from "./appwrite/auth";
import { login, logout } from "./app/authSlice";
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((user) => {
        if (user) {
          dispatch(login({ user }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className='mt-4 bg-blue-300 py-2 flex justify-center items-center rounded-xl text-3xl text-blue-600'>Loading...</div>
  )
  return (
    <div className='min-h-screen flex flex-wrap content-between bg-gradient-to-r from-blue-300 to-blue-100 '>
      <div className='w-full block'>
        <Header />
        <main className='min-h-[60vh]'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
