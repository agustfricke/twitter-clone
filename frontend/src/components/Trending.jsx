import { DotsHorizontalIcon } from "@heroicons/react/outline";

function Trending() {
  return (
    <div className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center justify-between">
      <div className="space-y-0.5">
        <p className="text-[#6e767d] text-xs font-medium">sksksks</p>
        <h6 className="font-bold max-w-[250px] text-sm">
          desccc
        </h6>
        <p className="text-[#6e767d] text-xs font-medium max-w-[250px]">
          Trending with{" "}
            <span className="tag"> 
              tagg
            </span>
        </p>
      </div>

        <div className="icon group">
          <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
        </div>
    </div>
  );
}

export default Trending;
