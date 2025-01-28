import { useState } from "react"

function UseStateType() {
    // Explicit type declaration
    const [count, setCount] = useState<number>(0)  

    return (
        <div className="flex items-center gap-5">
            <div>Count : {count}</div>
            <button 
                className="bg-blue-600 px-3 py-1 rounded-full"
                onClick={() => setCount(count + 1)}
            >
                Increase Count
            </button>
        </div>
    )
}

export default UseStateType

/*
TypeScript Learning Details:

1. useState Generic:
   - Built-in generic function: useState<T>(initialValue)
   - <number> specifies the state type (TS will enforce this everywhere)
   - Type argument can be explicitly declared or inferred from initial value

2. Type Inference:
   - Without annotation: useState(0) would infer type as number
   - Explicit typing becomes essential for complex types:
     - useState<string | null>(null)
     - useState<Array<{ id: number }>>([])

3. Type Safety Benefits:
   - setCount("5") would throw compile error (string vs number)
   - Prevents incorrect state mutations
   - Autocomplete shows correct type methods (number methods in this case)

4. Common Use Cases:
   - Primitives: useState<boolean>(true)
   - Objects: useState<{ name: string }>({ name: "John" })
   - Union Types: useState<"light" | "dark">("light")
   - Complex Types: useState<Map<string, number>>(new Map())

Best Practices:
- Use type inference for simple initial values (useState(0) instead of useState<number>(0))
- Explicit typing needed when initial value is undefined or doesn't match full type
- Always type useState when using complex objects or union types
- Use type guards when dealing with potentially null/undefined values
*/