import { useState } from "react"
import { BsArrowLeft, BsCheck2 } from "react-icons/bs"
import { Progress } from "../ui/progress"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

export const NewGroup = () => {
    const [IsImageUploading, setIsImageUploading] = useState(false)
    const [groupName, setGroupName] = useState("")

    return (
        <div className="w-full h-full">
            <div className="flex items-center space-x-10 pt-16 px-10 pb-5">
                <BsArrowLeft className="cursor=pointer text-2xl font-bold" />
                <p className="text-xl font-semibold">New Group</p>
            </div>
            <div className="flex flex-col justify-center items-center my-12">
                <img src="https://cdn.pixabay.com/photo/2023/04/03/18/35/nature-7897648_1280.jpg" />
                {IsImageUploading && (
                    <Progress className="absolute top-0 left-[6rem]" />
                )}
                <Input
                    type="file"
                    id="ImgInput"
                    className="hidden"
                    onChange={() => console.log("imagechange")}
                />
            </div>
            <div className="w-full flex justify-between items-center py-2 px-5">
                <Input
                    type="text"
                    className=" w-full outline-none border-b-2 border-green-700 px-2 bg-transparent"
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Subject"
                    value={groupName}
                />
            </div>
            {groupName && (
                <div className="py-10 flex items-center justify-center">
                    <Button>
                        <div className="bg-[#0c977d] rounded-full p-4">
                            <BsCheck2 className="font-bold text-3xl" />
                        </div>
                    </Button>
                </div>
            )}
        </div>
    )
}
