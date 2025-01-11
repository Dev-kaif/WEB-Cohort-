import axios from 'axios'
import { useEffect, useState } from 'react'


// wrting code like this takes all the benifit of the Next.js
function page() {

    const [blogs,setBlogs] = useState()

    // Using useEffect for data fetching causes the request to be made only after the component mounts, meaning the data is not available when the page is first loaded.
    //This leads to client-side rendering (CSR), where the page initially loads without the data, which can hurt performance and user experience.
    // SEO Issue: The search engine bots may index a blank page, missing important content that’s dynamically fetched on the client side after page load.

    //The use of useEffect means the client-side API request is made after the page is rendered. If you have multiple API requests, each request waits for the previous one to complete, leading to waterfalling.
    useEffect(() => {
      async function getblogs() {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos")
        setBlogs(response)
      }
      getblogs()
    }, [])
    

  return (
    <div>
      
    </div>
  )
}

export default page
