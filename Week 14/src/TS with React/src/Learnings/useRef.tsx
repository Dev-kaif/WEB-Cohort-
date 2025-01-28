/*
TypeScript Learnings:

1. useRef Typing:
- Must specify HTMLInputElement type for form refs
- Generic syntax: useRef<HTMLInputElement>(null)
- Provides access to input-specific properties (value, checked, etc)

2. Form Event Typing:
- FormEvent<HTMLFormElement> type for form submissions
- Better than using 'any' type for event parameter

3. Null Safety:
- Optional chaining (?.) avoids runtime null errors
- Type guards ensure refs are initialized before use
- Non-null assertion (!) should be avoided when possible because it says type can never be Null

*/


import { FormEvent, useRef, useState } from "react"

interface FormData {
    email: string
    username: string
    password: string
}

function UseRefForm() {
    const [data, setData] = useState<FormData[]>([])
    
    // TS: Proper HTMLInputElement type for form refs
    const emailRef = useRef<HTMLInputElement>(null)
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        
        // TS: Optional chaining with type guard
        if (!emailRef.current?.value || 
            !usernameRef.current?.value || 
            !passwordRef.current?.value) return

        const newEntry: FormData = {
            email: emailRef.current.value,
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }

        setData(prev => [...prev, newEntry])
    }

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-2">
                    <input
                        ref={emailRef}
                        type="email"
                        placeholder="Email"
                        className="p-2 text-black rounded"
                        required
                    />
                    <input
                        ref={usernameRef}
                        type="text"
                        placeholder="Username"
                        className="p-2 text-black rounded"
                        required
                    />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                        className="p-2 text-black rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                >
                    Submit
                </button>
            </form>

            <div className="mt-6 space-y-4">
                {data.map((entry, index) => (
                    <div key={index} className="p-4 bg-gray-800 rounded">
                        <p>Email: {entry.email}</p>
                        <p>Username: {entry.username}</p>
                        <p>Password: {entry.password}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UseRefForm
