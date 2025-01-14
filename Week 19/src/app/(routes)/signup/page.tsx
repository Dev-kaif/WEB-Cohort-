'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // we can navigate in next.js using router hook
  const router = useRouter()

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md bg-gray-700 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-100 mb-6">Sign up</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-100 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 text-black py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-100 mb-1">
              Username
            </label>
            <input
              type="username"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 text-black py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-100 mb-1">
              Password
            </label>
            <input
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 text-black py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            onClick={async ()=>{
              await axios.post('http://localhost:3000/api/v1/signup',{
                email,username,password
              })
              // using router to navigate
              router.push('/signin')
            }}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sign Up
          </button>
      </div>
    </div>
  );
};

export default SignIn;
