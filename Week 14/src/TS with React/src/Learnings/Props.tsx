import { ReactNode } from "react"

export default function SendProps() {
    return (
      <div className="flex flex-col gap-3">
        {/* Explicit props component */}
        <Props name={"Manglu"} age={25} title={"software"} />
        
        {/* Children props component */}
        <Props2>
            <div>Ranjana</div>
            <div>36</div>
            <div>Data Scientist</div>
        </Props2>
      </div>
    )
}

// TS interface for explicit props
interface Prop {  
    name: string,  
    age: number,  
    title: string  
}

function Props({name, age, title}: Prop) {  
    return (
      <div>
        <div>{name}</div> 
        <div>{age}</div>  
        <div>{title}</div>
      </div>
    )
}

// TS interface for children props
interface ChildProps {
    children: ReactNode 
}

function Props2({children}: ChildProps) {  
    return (
      <div>
        {children}
      </div>
    )
}

/* TypeScript Learning Details:

1. Component Prop Contracts:
- Interfaces (Prop) enforce strict shape validation
- Required props must be passed from parent components
- Type checking occurs at compile time (age="25" would error)

2. ReactNode Type:
- Special type for JSX children content
- Accepts: JSX elements, strings, numbers, fragments
- Must be imported from 'react' module
- More flexible than JSX.Element (which allows only single elements)

3. Type Safety Benefits:
- Prevents invalid prop values (e.g., string instead of number)
- Catches missing required props during development
- IDE autocomplete for props based on interface

4. Explicit Typing Patterns:
- Destructured props inherit interface types ({ name } knows it's string)
- Type annotations (: ChildProps) enable compiler checks
- Generic types (ReactNode) ensure valid children structure

Best Practices:
- Use interfaces for prop typing (better error messages)
- Always type children prop when using component composition
- Combine interface definitions with destructuring for clean code
- Use ReactNode unless you need strict single-element children
*/
