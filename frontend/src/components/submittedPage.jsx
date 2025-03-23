import React, { useEffect } from 'react'
import { useContext, useState } from 'react'
import { context } from '../App'
import LeaderBoard from './leaderBoard'
import axios from 'axios'

const SubmittedPage = () => {
    const [time, setTime] = useState('')
    const { leaderBoardTiming, showLeaderBoard, setShowLeaderBoard } = useContext(context)

    const { selectedAnswers, questionArr } = useContext(context)
    const [mark, setMark] = useState(0)

    useEffect(() => {

        const handleDetails = async () => {
            if(sessionStorage.getItem('submitPage')){
                console.log('already exists')
                return 
            }else{
                sessionStorage.setItem('submitPage',true)
            }

        var counter = 0;
        Object.entries(selectedAnswers).map(([key, value]) => {

            if (selectedAnswers[key] == questionArr[key].answer) {
                console.log('selectedAnswer[key]', selectedAnswers[key])
                console.log('questionArr[key].answer', questionArr[key].answer)
                counter++
            }
        })

        console.log('counter', counter)
        setMark(counter)


        const unparsedDetails = localStorage.getItem('details')
        const details = JSON.parse(unparsedDetails)

        // if(details.mark == 0 ){
        details.mark = counter
        
        const indexedTiming = new Date();
        indexedTiming.setHours(21,0, 0, 0);
        const time_duration = Math.floor((new Date().getTime() - indexedTiming.getTime()) / 1000);
        
        details.duration = time_duration;

        const res = await axios.post('https://quiz-beta-rust.vercel.app/submitDetails',details)
         console.log('res',res)

        localStorage.setItem('details', JSON.stringify(details))
        // }

    }

    handleDetails()

    }, [])


    useEffect(() => {

        const interval = setInterval(() => {
            const now = new Date();
            const remainingTime = new Date(leaderBoardTiming).getTime() + 1 * 60 * 1000 - now;

            if (remainingTime > 0) {
                const hours = String(Math.floor((remainingTime / (1000 * 60 * 60)) % 24)).padStart(2, '0');
                const minutes = String(Math.floor((remainingTime / (1000 * 60)) % 60)).padStart(2, '0');
                const seconds = String(Math.floor((remainingTime / 1000) % 60)).padStart(2, '0');
                console.log('mew')
                // console.log(`Remaining Time: ${hours}h ${minutes}m ${seconds}s`);
                setTime(`${hours}:${minutes}:${seconds}`);
            } else {
                // console.log("Time is up!");
                setShowLeaderBoard(true)
                // clearInterval(interval)
                //location.reload()
            }
        }, 1000)

        return (() => clearInterval(interval))
    }, [])


    return (

        <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            {showLeaderBoard ? <LeaderBoard /> :
                <div style={{ backgroundColor: '#f9f9f9', borderRadius: '10px', padding: '30px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <h1 style={{ color: '#4CAF50', fontSize: '2rem' }}>Thank you for submitting!</h1>
                    <p style={{ fontSize: '1.2rem', color: '#555' }}>
                        Time remaining for the leaderboard:
                        <span style={{ fontWeight: 'bold', color: '#FF5722', marginLeft: '5px' }}>{time}</span>
                    </p>

                    <div className="mt-6 h-auto flex flex-col">
                                            <h3 className="text-xl font-bold mb-4">Results</h3>
                                            {questionArr.map((question, index) => (
                                                <div
                                                    key={index}
                                                    className={`mb-4 p-4 rounded ${!selectedAnswers[index] ? "bg-gray-300" :
                                                        selectedAnswers[index] === question.answer
                                                            ? "bg-green-300"
                                                            : "bg-red-300"
                                                        }`}
                                                >
                                                    <p>
                                                        <strong>Q{index + 1}:</strong> {question.question}
                                                    </p>
                                                    <p>
                                                        <strong>Your Answer:</strong>{" "}
                                                        {selectedAnswers[index]
                                                            ? <> {selectedAnswers[index]} . {question.options[selectedAnswers[index]]}</>
                                                            : "Not answered"}
                                                    </p>
                                                    <p>
                                                        <strong>Correct Answer:</strong> {question.answer} . {question.options[question.answer]}
                                                    </p>
                                                </div>
                                            ))}
                                            {/* <button
                                                onClick={() => { //location.reload() }}
                                                className="border-2 bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 mx-auto"
                                            >
                                                Refresh
                                            </button> */}

                                            <br /><br />
                                        </div>
                </div>
            }
        </div>

    )
}

export default SubmittedPage