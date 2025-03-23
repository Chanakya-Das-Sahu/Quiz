import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { context } from "../App";

const Register = () => {
    
    const [details, setDetails] = useState({
        name: "",
        rollno: "",
        gmail: "",
        branch: "",
        mark: "0",
        duration: ""
    });

    const [otp, setOtp] = useState({
        generated: "",
        input: "",
    });

    const { setShowLoginPage } = useContext(context)
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleOTPGenerate = async () => {
        if (!details.gmail || !details.rollno || !details.name) {
            alert("Please fill all fields");
            return;
        }
        details.rollno = details.rollno.toUpperCase();

        let regex = /^MU\d{2}BT([A-Za-z]+)H?\d{3}$/;
        let match = details.rollno.match(regex);
           console.log('details.rollno',match[1])
        // return ;

        const branch = match[1] ? match[1].replace(/H$/, '') : null;
        // const branch = branch.toUpperCase();
        // console.log('branch',branch)
        setDetails((prev) => ({ ...prev, branch }));
        setLoading(true);

        try {
            const response = await axios.post("https://techfest-participants.vercel.app/api/generateOTP", { gmail: details.gmail });
            setOtp((prev) => ({ ...prev, generated: response.data.otp }));
            setOtpSent(true);
        } catch (error) {
            alert("Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = () => {
        if (otp.generated === otp.input) {
            details.rollno = details.rollno.toUpperCase();
            localStorage.setItem("auth86", details.branch);
            localStorage.setItem('details', JSON.stringify(details))
            // alert("Registration successful");
            location.reload()

            setShowLoginPage(false)
            //location.reload()
        } else {
            alert("Invalid OTP");
        }
    };

    return (
        <div className="register-container absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg p-6 w-full h-96 max-w-96">
            <div
                className="close-icon text-red-500 text-xl font-bold cursor-pointer float-right"
                onClick={() => setShowLoginPage(false)}
            >
                &times;
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Register</h2>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={details.name}
                onChange={handleInputChange}
                className="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                name="rollno"
                placeholder="Roll Number"
                value={details.rollno}
                onChange={handleInputChange}
                className="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="email"
                name="gmail"
                placeholder="Gmail"
                value={details.gmail}
                onChange={handleInputChange}
                disabled={otpSent}
                className={`w-full p-2 mb-3 border rounded focus:outline-none ${otpSent ? "bg-gray-200 border-gray-300" : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                    }`}
            />
            {!otpSent ? (
                <button
                    onClick={handleOTPGenerate}
                    disabled={loading}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                >
                    {loading ? <img src="/loading.gif" alt="Loading" className="h-5 mx-auto" /> : "Send OTP"}
                </button>
            ) : (
                <>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp.input}
                        onChange={(e) => setOtp((prev) => ({ ...prev, input: e.target.value }))}
                        className="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                    >
                        Submit
                    </button>
                </>
            )}
        </div>
    );
};

export default Register;

/*

Generate Register Page :

state to create :

details : {name,rollno,gmail,branch}
otp : {generated,input}

create input fields 
name , rollno , gmail 
send otp button beneth 

click on the send otp button will call function named handleOTP Genearate will store all values to state object 
not explicit input for branch will be extracted from roll no which be like this mu22btcse012 

that will trigger an api with post method with axios containing payload gmail 

during this render loading image inside of send otp button and removes the text send otp  
when api responses back with res.data.otp would be stored in otp.generated


stop loading 

freeze gmail input field 

remove send otp button and create input field of otp 
create submit button beneath  
on click of button will trigger function named handleSubmit match both of the otp generated and input and 

if matches :

in localStorage store CSE means whatever branch in uppercase with key 'auth86'

if not : 

alert invalid otp


other things : 

also add cross icon on top right corner 

*/