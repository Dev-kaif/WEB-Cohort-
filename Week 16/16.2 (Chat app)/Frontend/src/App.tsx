import { useEffect, useRef, useState } from "react";

interface Message {
  type: string;
  payload: {
    message?: string;
    roomId?: number;
  };
}

const App = () => {
  const messageRef = useRef<HTMLInputElement | null>(null);
  const roomRef = useRef<HTMLInputElement | null>(null);

  const socket = useRef<WebSocket | null>(null);

  const [messages, setMessages] = useState<string[]>([]);
  const [roomId, setRoomId] = useState<number | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    socket.current = ws;

    ws.onopen = () => {
      console.log("Connected to WebSocket server.");
    };

    ws.onmessage = (e) => {
      try {
          setMessages((prevMessages) => [...prevMessages, e.data]);
      } catch (error) {
        console.error("Failed to parse message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      ws.close();
      socket.current = null;
    };
  }, []);

  const sendMessage = () => {
    if (!messageRef.current || !messageRef.current.value || !socket.current) return;

    const newMessage = messageRef.current.value.trim();
    if (!newMessage) return;

    messageRef.current.value = "";

    const chatMessage: Message = {
      type: "chat",
      payload: {
        message: newMessage,
      },
    };

    socket.current.send(JSON.stringify(chatMessage));
  };

  const joinRoom = () => {
    if (!socket.current || !roomRef.current) return;

    const inputRoomId = Number(roomRef.current.value.trim());
    if (isNaN(inputRoomId)) {
      alert("Please enter a valid room ID.");
      return;
    }

    setRoomId(inputRoomId);

    const joinMessage: Message = {
      type: "join",
      payload: {
        roomId: inputRoomId,
      },
    };

    socket.current.send(JSON.stringify(joinMessage));
  };

  const createRoom = () => {
    if (!socket.current) return;

    const newRoomId = Math.floor(10000 + Math.random() * 90000);
    setRoomId(newRoomId);

    const createMessage: Message = {
      type: "join",
      payload: {
        roomId: newRoomId,
      },
    };

    socket.current.send(JSON.stringify(createMessage));
    navigator.clipboard.writeText(newRoomId.toString());
    alert(`Copied room Id: ${newRoomId}`)
    console.log(`Room ${newRoomId} created and joined.`);
  };

  const leaveRoom = ()=>{
    setRoomId(null)
  }

  return (
    <div className="bg-zinc-800 flex flex-col justify-center items-center h-screen gap-4">
      <div className="flex flex-col items-center gap-4">
        {roomId&&<div className="flex flex-col gap-2">
        {/* Chat Messages */}
        <div className="bg-white h-96 w-80 text-black flex flex-col justify-end p-2 overflow-auto rounded-md">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="bg-blue-300 px-2 py-1 w-fit max-w-full break-words m-1 rounded-md"
            >
              {msg}
            </div>
          ))}
        </div>

        {/* Input Field and Send Button */}
        <div className="flex items-center gap-2 w-full max-w-xs">
          <input
            ref={messageRef}
            className="p-2 h-10 bg-zinc-700 rounded-lg text-white outline-none flex-grow"
            type="text"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-3 py-1 rounded-md"
          >
            Send
          </button>
        </div>
          <button
            onClick={leaveRoom}
            className="bg-blue-500 text-white px-3 py-1 rounded-md"
          >
            Leave Room
          </button>
        </div>}

        {/* Room Management Section */}
        {!roomId&&<div className="flex flex-col items-center bg-zinc-700 p-4 rounded-md gap-4 w-full max-w-xs">
          <div className="text-white text-sm">
            {roomId ? `Current Room ID: ${roomId}` : "No room joined yet"}
          </div>
          <div className="flex items-center gap-2 w-full">
            <input
              ref={roomRef}
              className="p-2 h-10 bg-zinc-600 rounded-lg text-white outline-none flex-grow"
              type="text"
              placeholder="Enter Room ID"
            />
            <button
              onClick={joinRoom}
              className="bg-blue-500 text-white px-4 py-1 rounded-md"
            >
              Join Room
            </button>
          </div>
          <button
            onClick={createRoom}
            className="bg-green-500 text-white px-4 py-1 rounded-md"
          >
            Create Room
          </button>
        </div>}
      </div>
    </div>
  );
};

export default App;
