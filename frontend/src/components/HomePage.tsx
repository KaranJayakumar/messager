import { AiOutlineSearch } from "react-icons/ai"
import { BiCommentDetail } from "react-icons/bi"
import { BsFilter } from "react-icons/bs"
import { TbCircleDashed } from "react-icons/tb"

export const HomePage = () => {
    return (
        <div className="relative">
            <div className="py-14 bg-[#00a884] w-full "></div>
            <div className="flex h-[90vh] bg-[#33302f] absolute top-6 left-6 w-full">
                <div className="left w-[30%] h-full">
                    <div className="w-full">
                        <div className="flex justify-between items-center p-3">
                            <div className="flex items-center space-x-3">
                                <img
                                    className="rounded-full w-10 h-10 cursor-pointer"
                                    src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
                                />
                                <p>Username</p>
                            </div>
                            <div className="space-x-3 text-2xl flex">
                                <TbCircleDashed />
                                <BiCommentDetail />
                            </div>
                        </div>
                        <div className="relative flex justify-center items-center py-4 px-3">
                            <input
                                className="border-none outline-none rounded-lg w-[93%] pl-9 py-2"
                                type="text"
                                placeholder="Search or start new chat"
                            />
                            <AiOutlineSearch className="left-5 top-7 absolute" />
                            <div>
                                <BsFilter className="ml-4 text-3xl" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right"></div>
            </div>
        </div>
    )
}
