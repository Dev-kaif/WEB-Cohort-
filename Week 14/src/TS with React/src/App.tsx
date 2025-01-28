import Axios from "./Learnings/Axios"
import SendProps from "./Learnings/Props"
import UseStateType from "./Learnings/useState"
import UseRef from './Learnings/useRef';

function App() {
  return (
    <div className="bg-black text-white h-screen flex flex-col gap-5">
      <Axios/>
      <SendProps/>
      <UseStateType/>
      <UseRef/>
    </div>
  )
}

export default App
