import image from "../assets/favicon.ico"
const WhoFollow = () => {
    return (
        <>
            <div
                className="bg-gray-800 rounded-lg mt-5
p-3
cursor-pointer 
">

                <h1 className="text-start text-xl font-bold mb-6">
                    Who to follow
                </h1>


                <div className="flex flex-row items-start gap-3 my-3">
                    <img className="h-11 w-11 rouned-full" src={image} />
                    <div>
                        <div className="flex flex-row items-center gap-11">
                            <p

                                className="
        text-white 
        font-semibold 
        cursor-pointer 
        hover:underline
    ">
                                Elon Musk
                            </p>

                            <button className="bg-slate-200 hover:bg-slate p-1 px-3 rounded-full ml- text-black font-bold hover:bg-slate-100">
                                Follow
                            </button>
                        </div>
                        <div className="text-white mt-1 text-start">
                            <span

                                className="
text-neutral-500
hidden
md:block
">
                                @elonmusk
                            </span>
                        </div>
                        <div className="flex flex-row items-center mt-3 gap-10">




                        </div>
                    </div>
                </div>

                <div className="flex flex-row items-start gap-3">
                    <img className="h-11 w-11 rouned-full" src={image} />
                    <div>
                        <div className="flex flex-row items-center gap-11">
                            <p

                                className="
        text-white 
        font-semibold 
        cursor-pointer 
        hover:underline
    ">
                                Elon Musk
                            </p>

                            <button className="bg-slate-200 hover:bg-slate p-1 px-3 rounded-full ml- text-black font-bold ">
                                Follow
                            </button>
                        </div>
                        <div className="text-white mt-1 text-start">
                            <span

                                className="
text-neutral-500
hidden
md:block
">
                                @elonmusk
                            </span>
                        </div>
                        <div className="flex flex-row items-center mt-3 gap-10">




                        </div>
                    </div>
                </div>


            </div>

        </>
    )
}

export default WhoFollow