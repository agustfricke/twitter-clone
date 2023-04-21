import { useState } from "react";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode"
import useWebSocket from "react-use-websocket";

const Chat = () => {

  const { user } = useParams()

  const token_verif = jwt_decode(localStorage.getItem('access'))
  const me = token_verif.username

  const [message, setMessage] = useState('')
  const [history, setHistory] = useState([])

  const { sendJsonMessage } = useWebSocket('ws://127.0.1:8000/ws/' + user + '/' + me + '/', {

    onOpen: () => {
      console.log("Connected!");
    },
    onClose: () => {
      console.log("Disconnected!");
    },
    })
    
  const onClick = () => {
    sendJsonMessage({ 'message': message, 'username': me })
    setHistory([...history, { 'message': message, 'username': me }])
    setMessage('')
  }



  return (
    <div>
      <h1>Chat</h1>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={onClick}>Send</button>
                {history.map((message) => (
        <>
                {message.username === user ?

            <>
                  <p>{message.username}</p>
                  <p>{message.message}</p>
                  </>

            : 

              <>

                  <p>This is me!</p>
                  <p>{message.message}</p>
                  </>

                  }
                  </>

                ))}
    </div>
  )
}

export default Chat
