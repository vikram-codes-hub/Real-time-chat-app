import React, { useState,useContext } from 'react';
import assets from '../assets/assets';
import { Authcontext } from '../Context/Authcontext';

const Login = () => {
    const [formMode, setFormMode] = useState('login');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const [isDataSubmitted, setIsDataSubmitted] = useState(false);

    const {Login}=useContext(Authcontext)
  

   const handleSubmit = (e) => {
    e.preventDefault();
    if (formMode === 'Signup' && !isDataSubmitted){
        setIsDataSubmitted(true);
        return;
    }

    Login(formMode === "Signup" ? 'signup' : 'login', { fullName, email, password, bio });
};


    return (
        <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-900 p-4">
            {/* Left Section - Branding */}
            <div className="md:w-1/2 flex flex-col items-center justify-center md:pr-12 mb-10 md:mb-0">
                <img 
                    src={assets.logo} 
                    className='w-[min(30vw,250px)] mb-8 transition-transform duration-500 hover:scale-105' 
                    alt="App Logo" 
                />
                <div className="text-center max-w-md">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            Welcome to ChatApp
                        </h1>
                        <p className="text-gray-300 text-lg">
                            {formMode === 'login' 
                                ? 'Connect with friends and colleagues in real-time.' 
                                : 'Join our community and start chatting today.'}
                        </p>
                    </div>
                    
                </div>
            </div>

            {/* Right Section - Form */}
            <div className="relative w-full md:w-1/2 max-w-md">
                <div className="absolute -inset-4 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-500/20 rounded-2xl blur-lg opacity-75 animate-pulse"></div>
                
                <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-gray-700/50 transition-all duration-500 hover:border-purple-500/30">
                    {/* Form Header */}
                    <div className="bg-gradient-to-r from-purple-900/80 to-blue-900/80 p-6 text-center border-b border-gray-700 ">
                      <div>
                          <h2 className="text-3xl font-bold text-white capitalize">
                            {isDataSubmitted 
                                ? 'Complete Your Profile' 
                                : formMode === 'login' 
                                    ? 'Welcome Back' 
                                    : 'Create Account'}
                        </h2>
                        <p className="text-blue-200/90 mt-2 text-sm">
                            {isDataSubmitted
                                ? 'Tell us more about yourself'
                                : formMode === 'login' 
                                    ? 'Sign in to continue your conversations' 
                                    : 'Start by creating your account'}
                        </p>
                      </div>
                   
                    </div>
                    
                    {/* Form Body */}
                    <div className="p-6 sm:p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {(formMode === 'Signup')&& !isDataSubmitted && (
                                <div className="space-y-2 animate-fadeIn">
                                    <label className="block text-sm font-medium text-gray-300/90">Full Name</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400/70"
                                            placeholder="Enter your full name"
                                            required
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {(formMode === 'Signup'||formMode==='login') && !isDataSubmitted && (
                                <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-300/90">Email</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400/70"
                                        placeholder="your@email.com"
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            )}


                             {(formMode === 'Signup'||formMode==='login') && !isDataSubmitted && (
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-300/90">Password</label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400/70"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                             )}

                            {formMode === 'Signup' && isDataSubmitted && (
                                <div className="space-y-2 animate-fadeIn">
                                    <label className="block text-sm font-medium text-gray-300/90">Your Bio</label>
                                    <textarea
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400/70"
                                        placeholder="Tell us about yourself..."
                                        required
                                    />
                                </div>
                            )}

                            {formMode === 'Signup' && !isDataSubmitted && (
                                <div className="flex items-start animate-fadeIn">
                                    <div className="flex items-center h-5">
                                        <input
                                            type="checkbox"
                                           
                                            className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-offset-gray-800"
                                            required
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label className="font-medium text-gray-300/90">
                                            I agree to the <a href="#" className="text-blue-400 hover:underline hover:text-blue-300 transition">Terms</a> and <a href="#" className="text-blue-400 hover:underline hover:text-blue-300 transition">Privacy Policy</a>
                                        </label>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="py-3.5 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-95 group"
                                >
                                    <span className="relative z-10 flex items-center justify-center">
                                        {formMode === 'login' 
                                            ? 'Login' 
                                            : isDataSubmitted 
                                                ? 'Complete Registration' 
                                                : 'Continue'}
                                        <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isDataSubmitted ? "M5 13l4 4L19 7" : "M14 5l7 7m0 0l-7 7m7-7H3"}></path>
                                        </svg>
                                    </span>
                                </button>

                                {formMode === 'Signup' && isDataSubmitted && (
                                    <button
                                        type="button"
                                        onClick={() => setIsDataSubmitted(false)}
                                        className="flex items-center text-gray-400 hover:text-white transition-colors"
                                    >
                                        <span className="mr-1">Back</span>
                                        <img 
                                            src={assets.arrow_icon} 
                                            className="w-4 h-4 rotate-180" 
                                            alt="Back" 
                                        />
                                    </button>
                                )}
                            </div>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-sm text-gray-400/90">
                                {formMode === 'login' 
                                    ? "New to our platform?" 
                                    : "Already have an account?"}
                                <button
                                    onClick={() => {
                                        setFormMode(formMode === 'login' ? 'Signup' : 'login');
                                        setIsDataSubmitted(false);
                                    }}
                                    className="ml-2 text-blue-400 font-medium hover:text-blue-300 hover:underline transition"
                                >
                                    {formMode === 'login' ? 'Sign up for free' : 'Sign in here'}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;