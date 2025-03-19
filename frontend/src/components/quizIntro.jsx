import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { context } from "../App";
const QuizIntro = () => {
    const [time, setTime] = useState(new Date());
    const [timeDiff, setTimeDiff] = useState()
    const { timing } = useContext(context)

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());

            const now = new Date()
            now.setMilliseconds(0)

            const diff = Math.max(0, Math.floor((timing - now) / 1000));
            const hours = String(Math.floor(diff / 3600)).padStart(2, '0');
            const minutes = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
            const seconds = String(diff % 60).padStart(2, '0');
            setTimeDiff(`${hours}:${minutes}:${seconds}`);


        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="font-sans text-center p-6 bg-gray-100 rounded-lg shadow-md max-w-xl mx-auto mt-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Welcome to the Quiz!</h1>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Will Start </h1>
            <div className="mb-6">
                {/* <h2 className="text-lg font-semibold text-gray-700">Current Time:</h2> */}
                <p className="text-xl text-blue-500 mt-2">
                    {/* {timeDiff.toLocaleTimeString("en-US", { hour12: false })} */}
                    {timeDiff}
                </p>
            </div>
            <div className="text-left">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Quiz Rules</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Do not switch tabs during the quiz.</li>
                    <li>Ensure your internet connection is stable.</li>
                    <li>Attempt every question within the given time limit.</li>
                    <li>Once submitted, answers cannot be changed.</li>
                    <li>Stay focused and give your best effort!</li>
                </ul>
            </div>
        </div>
    );
};

export default QuizIntro;
