import React from "react";
import { useContext , useState , useEffect } from "react";

import CSE from "../JSON/CSE.json";
import MEC from "../JSON/MEC.json";
import AERO from "../JSON/AERO.json";
import CIV from "../JSON/CIV.json";


const Questions = () => {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const[questionArr,setQuestionArr] = useState([])
    const[mark,setMark] = useState(0)
    const[questionPointer,setQuestionPointer] = useState(0)
    const[pointedQuestion,setPointedQuestion] = useState({})

    const branches = {
        CSE,
        MEC,
        AERO,
        CIV
    };

    useEffect(() => {
        console.log('useEffect[]')
        const local = localStorage.getItem('auth86');
        console.log('local',local)
        console.log('branches', branches[local])
        setQuestionArr(branches[local]);
        setPointedQuestion(branches[local][0])
        // const interval = setInterval(() => {
        //     setQuestionPointer((prev)=>{ return prev+1})
            
        //     if (questionPointer === 30) {
        //         clearInterval(interval);
        //     }
        // }, 7000);

        // return () => clearInterval(interval);

    }, []);

    useEffect(()=>{
        // console.log('questionPointer',questionPointer)
        //    console.log('questionArr[questionPointer+1]',questionArr[questionPointer])
           const data = questionArr[questionPointer]
           if(data!='undefined' & data!=undefined){
            console.log('questionPointer',questionArr[questionPointer])
            setPointedQuestion(questionArr[questionPointer])
           }
        
    },[questionPointer])

    // useEffect(()=>{
    //     console.log('pointedQuestion',pointedQuestion)
    // },[pointedQuestion])

    const handleOptionChange = (questionIndex, option) => {
        setSelectedAnswers({ ...selectedAnswers, [questionIndex]: option });
        
        // if(questionArr[questionIndex].answer==option){
        //     console.log('right')
        // }else{
        //     console.log('wrong')
        // }
    };

    // useEffect(()=>{
    //   console.log("selectedAnswers",selectedAnswers)
    // },[selectedAnswers])

    const calculateResults = () => {
        var counter = 0 ;
        Object.entries(selectedAnswers).map(([key,value])=>{
        
          if(selectedAnswers[key] == questionArr[key].answer){
            counter++
          }
        })
        console.log('counter',counter)
        setMark(counter)
    };

    return (
        <>
            <div className={`max-w-xl mx-auto p-6 h-screen`}>
                <div className={`flex flex-col h-auto ${showResults ? 'hidden' : ' '}`}>
                    {/* {questionArr.map((question, index) => ( */}
                    {/* {questionArr[questionN]} */}
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
                    {/* ))} */}


                    <button
                        onClick={calculateResults}
                        className="border-2 bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 mx-auto"
                    >
                        Submit
                    </button>
                    <br /><br />
                </div>



                {showResults && (
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
                        <button
                            onClick={() => { location.reload() }}
                            className="border-2 bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 mx-auto"
                        >
                            Refresh
                        </button>

                        <br /><br />
                    </div>
                )}
            </div>
        </>
    )
}

export default Questions;