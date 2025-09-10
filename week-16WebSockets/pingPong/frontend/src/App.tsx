import './App.css'
import { useState, useEffect } from 'react'
function App() {
 const [message, setMessage] = useState('')
 const [socket, setSocket] = useState<WebSocket | undefined>();
 function sendMessage(){
    if(!socket){
      return;
    }
    socket.send(message);
    console.log("Message sent: ", message);
    setMessage('');
 }
 useEffect(()=>{
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);
    ws.onerror = (error)=> {
      console.log("WebSocket error: ", error);
    }
    ws.onopen = ()=>{
      console.log("WebSocket connection established");
    }
    ws.onmessage = (event)=> {
      console.log("Message from server: ", event.data);
    }
 },[]);

  return (
    <div>
      <input 
        type='text'
        placeholder='Message'
        name='message'
        id='message'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  )
}

export default App

