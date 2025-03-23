import React from "react";
import { useContext, useState, useEffect, useRef } from "react";
import { context } from "../App";

import CSE from "../JSON/CSE.json";
import ME from "../JSON/MEC.json";
import AE from "../JSON/AERO.json";
import CIV from "../JSON/CIV.json";
import MIN from '../JSON/MIN.json'


const Questions = () => {
    const [progressWidth, setProgressWidth] = useState("100%");
    const [time, setTime] = useState('')
    const [showResults, setShowResults] = useState(false);
    const [questionPointer, setQuestionPointer] = useState(0)
    const [pointedQuestion, setPointedQuestion] = useState({})

    const { showSubmittedPage, setShowSubmittedPage, selectedAnswers, setSelectedAnswers, questionArr, setQuestionArr, leaderBoardTiming } = useContext(context)

    const branches = {
        CSE,
        ME,
        AE,
        CIV,
        MIN
    };


    const interval = useRef(null);

   
    useEffect(() => {

        const interval = setInterval(() => {

            const now = new Date();

            const remainingTime = leaderBoardTiming - now;
            if (remainingTime > 0) {
                const hours = String(Math.floor((remainingTime / (1000 * 60 * 60)) % 24)).padStart(2, '0');
                const minutes = String(Math.floor((remainingTime / (1000 * 60)) % 60)).padStart(2, '0');
                const seconds = String(Math.floor((remainingTime / 1000) % 60)).padStart(2, '0');
                console.log('mew')
                setTime(`${hours}:${minutes}:${seconds}`);
            } else {
                setShowSubmittedPage(true)
            }
        }, 1000)

        return (() => clearInterval(interval))
    }, [])

   

    useEffect(() => {
        const local = localStorage.getItem('auth86');
        setQuestionArr(branches[local]);
        setPointedQuestion(branches[local][0])
        console.log('questionArr', questionArr)
    }, [questionArr]);


    const incrementQuestionPointer = () => {
        if (questionPointer < questionArr.length - 1) {
            setQuestionPointer((prev) => prev + 1);
            setPointedQuestion(questionArr[questionPointer + 1])
        }
    };

    const decrementQuestionPointer = () => {
        if (questionPointer > 0) {
            setQuestionPointer((prev) => prev - 1);
            setPointedQuestion(questionArr[questionPointer - 1])
        }
    };

    const handleIndexedQuestionPointer = (index) => {

        setQuestionPointer(index);
        setPointedQuestion(questionArr[index])

    };

    

    const handleOptionChange = (questionIndex, option) => {
        setSelectedAnswers({ ...selectedAnswers, [questionIndex]: option });
    };


    return (
        <>
            <div
                className="absolute top-4 right-4 bg-blue-600 text-white p-3 rounded-lg shadow-lg flex items-center space-x-2"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m9-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <span className="font-semibold">Time Left:</span>
                <span className="font-mono text-lg">{time}</span>
            </div>

            <div
                className="h-2 bg-green-500 mb-4 transition-all duration-[7000ms] ease-linear"
                style={{ width: progressWidth }}
            ></div>

            <div className={`max-w-xl mx-auto p-6 h-screen`}>
                <div className={`flex flex-col h-auto ${showResults ? 'hidden' : ' '}`}>
                    <div key={questionPointer} className="mb-6 bg-white p-4 shadow rounded">
                        <h2 className="font-bold text-lg mb-4">
                            Q{questionPointer + 1}: {pointedQuestion.question}
                        </h2>
                        <div>
                            {pointedQuestion.options && Object.entries(pointedQuestion.options).map(([key, value]) => (
                                <label
                                    key={key}
                                    className="block cursor-pointer mb-2 border p-2 rounded hover:bg-gray-100"
                                >
                                    <input
                                        type="radio"
                                        name={`question-${questionPointer}`}
                                        value={key}
                                        checked={selectedAnswers[questionPointer] === key}
                                        onChange={() => handleOptionChange(questionPointer, key)}
                                        className="mr-2"
                                    />
                                    {key}:  {value}
                                </label>
                            ))}
                        </div>
                    </div>


                    <div className="flex flex-wrap justify-between items-center mt-4">
                        <button
                            onClick={decrementQuestionPointer}
                            disabled={questionPointer === 0}
                            className={`px-4 py-2 rounded ${questionPointer === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                        >
                            ← Previous
                        </button>
                        <button
                            onClick={incrementQuestionPointer}
                            disabled={questionPointer === questionArr.length - 1}
                            className={`px-4 py-2 rounded ${questionPointer === questionArr.length - 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                        >
                            Next →
                        </button>
                    </div>
                    <br /><br />
                </div>



                <div className="flex flex-wrap justify-center mt-4 space-x-2">
                    {questionArr.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleIndexedQuestionPointer(index)}
                            className={`${questionPointer == index ? 'bg-gray-500' : ''} w-8 h-8 rounded-full text-white font-bold ${selectedAnswers[index] ? 'bg-green-500' : 'bg-gray-400'
                                } hover:bg-gray-500`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

                <div className="flex flex-wrap justify-center mt-6">

                    <button
                        onClick={() => setShowSubmittedPage(true)}
                        className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Submit Quiz
                    </button>

                </div>

            </div>
        </>
    )
}

export default Questions;