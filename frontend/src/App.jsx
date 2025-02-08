import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import SolutionsPage from './pages/SolutionsPage'
import AboutUsPage from './pages/AboutPage'
import ContactUsPage from './pages/ContactUsPage'
import TaggingPage from './pages/TaggingPage'
import DashboardPage from './pages/DashPage'
import MarketHome from './pages/MarketHome'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'



function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen">
          <main className='flex-grow'>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/geotags' element={<TaggingPage />} />
              <Route path='/solutions' element={<SolutionsPage />} />
              <Route path='/about' element={<AboutUsPage />} />
              <Route path='/contact' element={<ContactUsPage />} />
              <Route path='/dashboard' element={<DashboardPage />} />
              <Route path='/marketplace' element={<MarketHome />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
