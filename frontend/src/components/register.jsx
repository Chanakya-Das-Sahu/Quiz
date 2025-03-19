import React from 'react'
import { useState } from 'react'
import { useContext } from 'react';
import { context } from '../App.jsx'
// import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const Register = () => {
    const [formData, setFormData] = useState({id:'', j_username: '', j_password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    // const navigate = useNavigate();
    const { showLoginPage, setShowLoginPage , setShowLoginButton } = useContext(context)
    const handleAuthAPI = async () => {
    
         try {
            console.log("charu")
            setLoading(true);
            setError('');
            const res = await axios.post('https://era-login.vercel.app/login', {j_username:formData.j_username,j_password:formData.j_password});
            console.log('res', res.data)

            if (res.data.msg) {
                // console.log('mew')
               const lid = formData.id.match(/^[A-Za-z0-9]{6}([A-Za-z]+)[0-9]+$/)[1].toUpperCase()
               console.log('lid',lid)
                localStorage.setItem('auth86',lid)
                setShowLoginButton(false)
            }

            if (res.data.alert) {
                console.log('how')
                setError('Invalid Credentials or Server Load')
            }
        } catch (err) {
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        // <div className="flex justify-center items-center h-screen bg-red-300">
        // <div className="absolute inset-0 flex justify-center items-center bg-gray-100">

        <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 mx-4 w-full max-w-80 h-96 p-6 rounded-lg shadow-lg bg-white">
            <button
                onClick={() => { setShowLoginPage(false) }}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
                ✖
            </button>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleAuthAPI();
                }}
            >
                 <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-2">ID</label>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        value={formData.id}
                        onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-2">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="j_username"
                        value={formData.j_username}
                        onChange={(e) => setFormData({ ...formData, j_username: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="j_password"
                        value={formData.j_password}
                        onChange={(e) => setFormData({ ...formData, j_password: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={`w-full py-2 text-white text-sm font-medium rounded-lg bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    disabled={loading}
                    onClick={handleAuthAPI}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
        // </div>
    );
};

export default Register;