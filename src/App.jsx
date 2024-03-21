import { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client'

const socket = io.connect("http://localhost:5001")


function App() {

  const [Message,setMessage] = useState("")
  const [message_recieved,setMessagerecieved] = useState("")
  const SendMessage = () => {
    socket.emit("send_message", {Message: Message})
  };

  useEffect(()=>{
    socket.on("recieve_message", (data)=>{
      // alert(data.Message);
      setMessagerecieved(data.Message)
    })
  },[socket])
  
  return (
    <div className="App">
      <input placeholder='Message...' onChange={(e)=>{setMessage(e.target.value)}}/>
      <button onClick={SendMessage}>Send Message</button>
      <div>Message:</div>
      <div>{message_recieved}</div>
    </div>
  );
}

export default App;
