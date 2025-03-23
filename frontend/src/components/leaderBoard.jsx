import React from 'react'
import { useContext , useState , useEffect } from 'react';
import { context } from '../App';
import axios from 'axios'
const LeaderBoard = () =>{
    const {selectedAnswers , questionArr} = useContext(context)
    const [leaderBoard, setLeaderBoard] = useState([])
    //     useEffect(() => {
    //     var counter = 0;
    //     Object.entries(selectedAnswers).map(([key, value]) => {

    //         if (selectedAnswers[key] == questionArr[key].answer) {  
    //             console.log('selectedAnswer[key]', selectedAnswers[key])  
    //             console.log('questionArr[key].answer', questionArr[key].answer) 
    //             counter++ 
    //         }
    //     })

    //     console.log('counter', counter)
    //     setMark(counter)

    //     if(localStorage.getItem('details') == null){
    //         localStorage.setItem('details',JSON.stringify({}))
        

    //    const unparsedDetails = localStorage.getItem('details')
    //    const details = JSON.parse(unparsedDetails)
    //    details.mark = counter 

    //    localStorage.setItem('details',JSON.stringify(details))

    // }, [])

    useEffect(() => {

        const getDetails = async () =>{
            const res = await axios.get('http://localhost:3000/leaderboard')
            console.log('res',res)
            setLeaderBoard(res.data)
        }
        getDetails()

    }, [])

    return (
        <>
        <div className="leaderboard font-sans p-5 text-center">
            <h1 className="text-green-500 text-4xl mb-5">LeaderBoard</h1>
            <table className="w-4/5 mx-auto border-collapse shadow-lg">
                <thead>
                    <tr className="bg-green-500 text-white">
                        <th className="p-3 text-lg">Rank</th>
                        <th className="p-3 text-lg">Name</th>
                        <th className="p-3 text-lg">Roll No</th>
                        <th className="p-3 text-lg">Mark</th>
                        <th className="p-3 text-lg">Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderBoard.map((user, index) => (
                        <tr 
                            key={index} 
                            className={`transition-colors ${
                                index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                            } hover:bg-gray-200`}
                        >
                            <td className="p-3 text-base border-b">{index + 1}</td>
                            <td className="p-3 text-base border-b">{user.name}</td>
                            <td className="p-3 text-base border-b">{user.rollno}</td>
                            <td className="p-3 text-base border-b">{user.mark}</td>
                            <td className="p-3 text-base border-b">{user.duration}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
}

export default LeaderBoard ;