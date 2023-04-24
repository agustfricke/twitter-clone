import { useState, useRef, useEffect} from "react";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode"
import { getChat } from "../api/apiChat";
import { useQuery} from 'react-query'

const ChatT = () => {

  const { user } = useParams()
   const ref = useRef(null);

  const token_verif = jwt_decode(localStorage.getItem('access'))
  const me = token_verif.username

  // const { data: canal, isLoading, isError, error } = useQuery(['canal', user], () => getChat(user))

  // console.log(canal)

  const [message, setMessage] = useState('')


  const socket = new WebSocket(`ws://127.0.0.1:8000/ws/${user}/${me}/`)

  const onClick = () => {
    socket.send(JSON.stringify({ message: message, 'username': me }))
    setMessage('')
  }

useEffect(() => {

socket.onopen = function () {
    console.log('CONNECTION OPEN')
};

socket.onclose = function () {
    console.log('CONNECTION CLOSE')
};

socket.onerror = function () {
    console.log('CONNECTION ERROR')
};
  socket.onmessage = function(event) {

    const data = JSON.parse(event.data);

    if (data.username === me) {

        document.querySelector('#chat-body').innerHTML +=

        `<li class="flex justify-end">
            <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded-lg">
                <span class="block">${data.message}</span>
            </div>
        </li>`


    } else {

        document.querySelector('#chat-body').innerHTML += 

        `<li class="flex justify-start">
            <div class="relative max-w-xl px-4 py-2 text-[#171c2d] bg-[#f9982f] rounded-lg">
                <span class="block">${data.message}</span>
            </div>
        </li>`

    }
    }
  }, []);


  // if (isLoading) return <div>Loading</div>
  // if (isError) return <div>Error: {error.message}</div>

return (
  <>
                    <ul ref={ref}  class="space-y-2" id="chat-body">


                    </ul>


    <div>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={onClick}>Send</button>
    </div>
                    </>

)
}

export default ChatT
