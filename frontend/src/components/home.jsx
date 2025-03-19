import React, { useEffect } from 'react'
import Register from './register.jsx'
import mats_logo from '../images/mats_logo.jpg'

import { useContext } from 'react'
import {context} from '../App.jsx'

const Home = () =>{

    const { showLoginPage , setShowLoginPage , showLoginButton , setShowLoginButton } = useContext(context)

    useEffect(()=>{
       const local = localStorage.getItem('auth86')
       if(local!='null' && local!=null && local!=undefined && local!='undefined'){
         setShowLoginButton(false)
       }
    },[])

    return(
        <>
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-blue-600 p-4 flex justify-between items-center">
                <div className="text-white text-xl font-bold">QuizMania</div>
              
              {showLoginButton && 
                <button className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200"
                 onClick={()=>{setShowLoginPage(true)}}
                >
                    Register
                </button>
              }  
            </nav>
            <header className="text-center py-16 bg-blue-500 text-white">
            <img src={mats_logo} alt="MATS Logo" className="mx-auto mb-4 w-32 h-32 p-2.5 rounded-full" />
                <h1 className="text-4xl font-bold">Welcome to QuizMania</h1>
                <p className="mt-4 text-lg">
                    Participate in the ultimate online quiz competition for various branches of engineering!
                </p>
                <p className="mt-2 text-lg">Date: 25th December 2023</p>
                <p className="mt-2 text-lg">Time: 10:00 AM - 1:00 PM</p>
            </header>
            <main className="p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Explore Your Knowledge</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-xl font-bold mb-2">Computer Science</h3>
                        <p>Test your programming and algorithmic skills.</p>
                    </div>
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-xl font-bold mb-2">Mechanical Engineering</h3>
                        <p>Challenge yourself with mechanical concepts and designs.</p>
                    </div>
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-xl font-bold mb-2">Electrical Engineering</h3>
                        <p>Show your expertise in circuits and systems.</p>
                    </div>
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-xl font-bold mb-2">Civil Engineering</h3>
                        <p>Test your knowledge of structures and materials.</p>
                    </div>
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-xl font-bold mb-2">Electronics</h3>
                        <p>Explore your understanding of electronic devices.</p>
                    </div>
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-xl font-bold mb-2">Chemical Engineering</h3>
                        <p>Dive into the world of chemical processes.</p>
                    </div>
                </div>
            </main>
            {showLoginPage && <Register/>}
            
        </div>
        </>
    )
}

export default Home ;