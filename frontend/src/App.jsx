import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/home.jsx'
// import Register from './register.jsx'
import QuizIntro from './components/quizIntro.jsx'
import QuizPage from './components/quizPage.jsx'
import LeaderBoard from './components/leaderBoard.jsx'
import SubmittedPage from './components/submittedPage.jsx'
const context = createContext()
const App = () => {
  const [showLoginPage, setShowLoginPage] = useState(false)
  const [showLoginButton, setShowLoginButton] = useState(true)
  const [showLeaderBoard, setShowLeaderBoard] = useState(false)
  const [hasTimeBeen, setHasTimeBeen] = useState(false)
  const [showSubmittedPage, setShowSubmittedPage] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [leaderBoardTiming, setLeaderBoardTiming] = useState('')
  const [questionArr, setQuestionArr] = useState([])
  const [timing, setTiming] = useState()

  const renderElement = () => {
    if (showLoginButton) return <Home />
    if (showSubmittedPage) return <SubmittedPage />
    if (showLeaderBoard) return <LeaderBoard />
    if (!showLoginButton && hasTimeBeen) return <QuizPage />
    if (!showLoginButton) return <QuizIntro />
  }




  useEffect(() => {
    const quizTime = new Date();
    quizTime.setHours(14, 51 ,10, 0);

    const leaderBoardTime = new Date(quizTime.getTime() + 10 * 60 * 1000);
    setLeaderBoardTiming(leaderBoardTime)
    setTiming(quizTime)

    const interval = setInterval(() => {
      const now = new Date()
      if (now >= quizTime) {
        setHasTimeBeen(now)
      }

      if (now >= leaderBoardTime) {
        // setShowSubmittedPage(true)
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
          setTiming,
          showLeaderBoard,
          setShowLeaderBoard,
          setShowSubmittedPage,
          leaderBoardTiming,
          selectedAnswers,
          setSelectedAnswers,
          questionArr,
          setQuestionArr
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