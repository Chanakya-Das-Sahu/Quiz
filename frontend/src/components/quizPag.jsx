import React, { useState, useEffect } from 'react';

import CSE from "../JSON/CSE.json";
import MEC from "../JSON/MEC.json";
import AERO from "../JSON/AERO.json";
import CIV from "../JSON/CIV.json";

const QuizPage = () => {
    const [questions, setQuestions] = useState([]);
    const [questionNum, setQuestionNum] = useState(0);

    const branches = {
        CSE,
        MEC,
        AERO,
        CIV
    };

    useEffect(() => {
        const local = localStorage.getItem('auth86');
        console.log('branches',branches[local])
        setQuestions(branches[local]);
    //    console.log('questions',questions)
        // const interval = setInterval(() => {
        //     setQuestionNum((prev) => prev + 1);
        //     if (questionNum === 30) {
        //         clearInterval(interval);
        //     }
        // }, 7000);

        // return () => clearInterval(interval);
    }, []);

useEffect(()=>{
    console.log('questions',questions)
},[questions])

    return (
        
        // <div className="p-5 font-sans text-gray-800">
        //     {questions.length > 0 && (
        //         <div className="border border-gray-300 rounded-lg p-5 bg-gray-50">
        //             <h2 className="text-2xl font-bold text-green-600">
        //                 Question {questionNum + 1}
        //             </h2>
        //             <p className="text-lg mb-5">{questions[questionNum]?.question}</p>
        //             <div>
        //                 {questions[questionNum].options.map((option, index) => (
        //                     <button
        //                         key={index}
        //                         className="block w-full py-2 px-4 mb-3 bg-green-500 text-white rounded-md text-left hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        //                         onClick={() => alert(`You selected: ${option}`)}
        //                     >
        //                         {option}
        //                     </button>
        //                 ))}
        //             </div>
        //         </div>
        //     )}
        // </div>
        <h1>{questions[questionNum]?.options?.map()}</h1>
    );
};

export default QuizPage;
