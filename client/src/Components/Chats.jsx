import React, { useEffect,useState} from 'react';
import socketIo from "socket.io-client";
import Messages from './Messages';
import "../Chat.css";
import ReactScrollToBottom from "react-scroll-to-bottom";
import {useNavigate} from "react-router-dom"; 
let socket;

const ENDPOINT = "https://chat-with-that-socket.onrender.com/";

const Chats = () => {
  const [values,setvalues]=useState("");
  const [id,setid] = useState("");
  const [messages,setMessages] = useState([]);
  var key=1;
  	let newDate = new Date()
let date = newDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
 
 const navigate = useNavigate();
  var [userdata,setuserdata] = useState();

  const checklogin = async () => {
    try{
      const res = await fetch('/check', {
        method: "GET",
        headers: {
          Accept:"application/json",
          "Content-Type": "application/json"
        },
        credentials:"include"
      });
      const data=await res.json();
      console.log(data);
      if(res.status===201){
        console.log("login first");
        navigate("/");
      }
      else{
       setvalues(data);
      }
    }
    catch(err){
       console.log(err);
    }
  }

 
var roomname;

  const checkRoom = () => {

     const room= document.getElementById('roomInput').value;
     roomname=room;
     socket.emit('room-joined',{room,id});
     
  }
  const send = () => {

     const message= document.getElementById('chatInput').value;
     const room= document.getElementById('roomInput').value;
     socket.emit('message',{message,id,room});
     document.getElementById('chatInput').value="";

  }

  useEffect(()=>{
    checklogin();
    

     socket = socketIo(ENDPOINT, { transports : ['websocket']});
     
    console.log()
    socket.on('connect',()=>{
      setid(socket.id);
  });

  socket.on('welcome', (data) => {
    setMessages([...messages, data]);
            console.log(data.user, data.message);
        });
        
        socket.emit('joined', { values });
  },[values]);


  useEffect(() => {
  key++;
  socket.on('sendMessage',(data) => {
    
    setMessages([...messages, data]);
    console.log(data.user,data.message,data.id);
  })
  socket.on('userJoined', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        })

  socket.on('leave', (data) => {
          setMessages([...messages, data]);
            console.log(data.user, data.message);
        });
        socket.on('entered-room', (data) => {
          setMessages([...messages, data]);
            console.log(data.user, data.message);
        });
        socket.on('room-filled', (data) => {
          setMessages([...messages, data]);
            console.log(data.user, data.message);
        });

  return () => {
    socket.on("disconnect");
  }

  },[messages]);

  
  return (
    <>
<section className="msger">
  <header className="msger-header">
  <div className="msger-inputarea">
    <input type="text" id="roomInput" className="msger-input" placeholder="Enter or create Room" />
    <button  onClick={checkRoom} className="msger-send-btn">Join</button>
</div>
    <div className="msger-header-options">
      <span><i className="fas fa-cog"></i></span>
    </div>
  </header>


  <ReactScrollToBottom className="msger-chat">

  {messages.map( (item,i) => <Messages key={key} date={date}  message={item.message} user={ item.id===id ? '' : item.user } user2={item.user} /> )}
    
  </ReactScrollToBottom>
 <div className="msger-inputarea">
    <input onKeyPress={(event) => event.key === 'Enter' ? send() : null} type="text" id="chatInput" className="msger-input" placeholder="Enter your message..." />
    <button  onClick={send} className="msger-send-btn">Send</button>
</div>

</section>
</>
  )
}

export default Chats;
