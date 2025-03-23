import React, { useEffect } from 'react'
import { useContext, useState } from 'react'
import { context } from '../App'
import LeaderBoard from './leaderBoard'

const SubmittedPage = () => {
    const [time, setTime] = useState('')
    const { leaderBoardTiming, showLeaderBoard, setShowLeaderBoard } = useContext(context)

    const { selectedAnswers, questionArr } = useContext(context)
    const [mark, setMark] = useState(0)

    useEffect(() => {
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

        localStorage.setItem('details', JSON.stringify(details))
        // }

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
                </div>
            }
        </div>

    )
}

export default SubmittedPage