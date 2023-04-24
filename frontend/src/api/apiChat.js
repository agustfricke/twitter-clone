import { api } from "./useAxios"

const axios = api()

export const getChat = async (username) => {
  const response = await axios.get(`/chat/canal/${username}/`)
  return response.data
}

        // {canal.map(c => (
        //   <>
        // {c.sender === me ? (
        //                 <li class="flex justify-end">
        //                     <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded-lg">
        //         <span class="block"> {c.msj}</span>
        //                     </div>
        //                 </li>

        // ) : (
        //                 <li class="flex justify-start">
        //                     <div class="relative max-w-xl px-4 py-2 text-[#171c2d] bg-[#f9982f] rounded-lg">
        //                         <span class="block">{c.msj}</span>
        //                     </div>
        //                 </li>


        // )}
        // </>
        // ))}
