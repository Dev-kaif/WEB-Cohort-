import { useEffect, useRef, useState } from "react"

const App = () => {
  const message:React.MutableRefObject<any> = useRef()
  const socket = useRef<WebSocket | null>(null);
  const [data,setData]:any = useState([])

  useEffect(()=>{
    const ws = new WebSocket('ws://localhost:8000')
      socket.current = ws

    ws.onmessage = (ev)=>{
      setData((prevData:any) => [...prevData, ev.data]);
    }

    return () => {
      ws.close();
    };
  },[])

  const sendMessage = () => {
    const newMessage = message.current.value; 
    message.current.value = '';

    if (!newMessage || !socket.current) return;
    socket.current.send(newMessage); 
  };
  
  return (
    <div className='bg-zinc-800 flex flex-col justify-center items-center h-screen gap-2'>
      <div className="flex justify-center items-center gap-2">
      <input ref={message} className='p-2 h-10 rounded-lg' type="text" placeholder='send message'/>
      <button onClick={sendMessage} className='bg-blue-500 text-white px-3 py-1 rounded-full' type='submit'>Submit</button>
      </div>
      <div>
      {data.map((item:any)=><div className="px-2 py-2 w-64 h-8 bg-white text-black flex items-center">{item}</div>)}
      </div>
    </div>
  )
}

export default App
