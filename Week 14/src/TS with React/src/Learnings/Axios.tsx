
/* What we learned here:
     Axios with TypeScript requires:
       - Importing AxiosResponse type
       - Defining interfaces for expected response shapes
       - Typing the response object (AxiosResponse<Todo>)
*/

import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"

// Define interface for TypeScript type checking
interface Todo {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

export default function Axios() {

    // Initialize state with TypeScript generic typing
    // <Todo | undefined> allows for undefined initial state
    const [data, setData] = useState<Todo | undefined>()

    useEffect(() => {
        async function fetchData(){
            // Specify response type with AxiosResponse<Todo>
            const response: AxiosResponse<Todo> = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
            setData(response.data)
        }
        fetchData()
    }, []) 

    if(data == undefined){
        return <div>Loading.....</div>
    } 

    return (
        <div> 
            {JSON.stringify(data)}
        </div>
    )
}

