import React from 'react'
import { useContext , useState , useEffect } from 'react';
import { context } from '../App';
const LeaderBoard = () =>{
    const {selectedAnswers , questionArr} = useContext(context)
    const[mark,setMark] = useState(0)

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


    return(
        <>
        <h1>LeaderBoard</h1>
        </>
    )
}

export default LeaderBoard ;