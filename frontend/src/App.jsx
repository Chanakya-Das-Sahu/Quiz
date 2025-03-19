import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/home.jsx'
// import Register from './register.jsx'
import QuizIntro from './components/quizIntro.jsx'
import QuizPage from './components/quizPage.jsx'
const context = createContext()
const App = () => {
  const [showLoginPage, setShowLoginPage] = useState(false)
  const [showLoginButton, setShowLoginButton] = useState(true)
  const [hasTimeBeen, setHasTimeBeen] = useState(false)
  const [timing, setTiming] = useState()

  const renderElement = () => {
    if (showLoginButton) return <Home />
    if (!showLoginButton && hasTimeBeen) return <QuizPage />
    if (!showLoginButton) return <QuizIntro />
  }




  useEffect(() => {
    const today8PM = new Date();
    today8PM.setHours(11, 16, 0, 0);

    setTiming(today8PM)

    const interval = setInterval(() => {
      const now = new Date()
      if (now >= today8PM) {
        setHasTimeBeen(now)
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])


  return (
    <>

      <BrowserRouter>
        <context.Provider value={{
          showLoginPage,
          setShowLoginPage,
          showLoginButton,
          setShowLoginButton,
          timing,
          setTiming
        }}>

          <Routes>
            {/* {showLoginButton ? <Route path='/' element={<Quiz/>} ></Route> : <Route path='/' element={<Home />} ></Route>} */}
            <Route path='/' element={renderElement()}></Route>
            {/* <Route path='/register' element={<Register />}></Route> */}
            <Route path='/quiz' element={<QuizIntro />}></Route>

          </Routes>
        </context.Provider>
      </BrowserRouter>

    </>
  )
}

export default App;
export { context }