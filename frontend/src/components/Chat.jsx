import { useState } from "react";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode"
import useWebSocket from "react-use-websocket";
import { getChat } from "../api/apiChat";
import { useQuery} from 'react-query'

const Chat = () => {

  const { user } = useParams()
  const token_verif = jwt_decode(localStorage.getItem('access'))
  const me = token_verif.username

  const { data: canal, isLoading, isError, error } = useQuery(['canal', user], () => getChat(user))

  const [messageHistory, setMessageHistory] = useState([]);
  const [message, setMessage] = useState("");


  const { sendJsonMessage } = useWebSocket('ws://127.0.1:8000/ws/' + user + '/' + me + '/', {
  onOpen: () => {
    console.log("Connected!");
  },
  onClose: () => {
    console.log("Disconnected!");
  },
    onMessage: (e) => {
      const data = JSON.parse(e.data);
      console.log(data)
      switch (data.type) {
        case "chat_message_echo":
          setMessageHistory((prev) => prev.concat(data));
          break;
        default:
          console.error("Unknown message type!");
          break;
    }
  }
});


  function handleChangeMessage(e) {
    setMessage(e.target.value);
  }

  const handleSubmit = () => {
    sendJsonMessage({
      type: "chat_message",
      message,
      username: me,
    });
    setMessage("");
  };



  if (isLoading) return <div>Loading</div>
  if (isError) return <div>Error: {error.message}</div>

  const chat = ([...canal, ...messageHistory])

  console.log(chat)

  return (
<div className="flex justify-center">

      <div className='flex justify-center mt-8'>
        <div class="max-w-2xl border rounded">

            <div class="relative w-full p-6 overflow-y-auto h-[30rem]">
              <ul class="space-y-2">

                {chat.map((message) => (

                <>

                  {message.username === me ? (

                  <li class="flex justify-end">
                    <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                      <span class="block">{message.message}</span>
                    </div>
                  </li>

                  ) : (

                  <li class="flex justify-start">
                    <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                      <span className="block text-indigo-600 xl:inline">{message.username}</span>
                      <span class="block">{message.message}</span>
                    </div>
                  </li>


                  )}


                </>

                ))}

              </ul>
            </div>

            <div class="flex items-center justify-between w-full p-3 border-t border-gray-300">

              <input type="text" placeholder="Message"
                onChange={handleChangeMessage}
                value={message}
                class="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                name="Message" required />

              <button type='submit' onClick={handleSubmit}>
                <svg class="w-5 h-5 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>

            </div>
          </div>
        </div>
      </div>
  )
}

export default Chat
