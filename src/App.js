import React from 'react'
import Header from './components/Header'
import PageContent from './components/PageContent'
import Footer from './components/Footer'
import{BrowserRouter }from 'react-router-dom'
import "./components/style.css"
const App = () => {
  return (
    <div className='appDiv'>
      <BrowserRouter>
      <Header />
      <PageContent/>
      <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
