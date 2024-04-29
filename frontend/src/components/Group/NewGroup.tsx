import { useState } from "react"
import { BsArrowLeft, BsCheck2 } from "react-icons/bs"
import { Progress } from "../ui/progress"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useAppDispatch } from "@/redux/hooks"
import { User } from "@/types"
import { createGroupChat } from "@/redux/Chat/Action"
export const NewGroup = ({
    groupMembers,
    setIsGroup,
}: {
    groupMembers: Set<User>
    setIsGroup: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const [IsImageUploading, setIsImageUploading] = useState(false)
    const [groupName, setGroupName] = useState("")
    const [groupImage, setGroupImage] = useState("")
    const dispatch = useAppDispatch()
    const token = localStorage.getItem("token")
    const handleCreateGroup = async () => {
        const userIds = Array.from(groupMembers).map((user) => user.id)
        if (token) {
            await dispatch(
                createGroupChat({
                    userIds,
                    chatName: groupName,
                    chatImage:
                        groupImage ||
                        "https://cdn.pixabay.com/photo/2023/04/03/18/35/nature-7897648_1280.jpg",

                    token: token,
                })
            )
        }
        setIsGroup(false)
    }
    const uploadToCloudinary = async (image: File | null) => {
        setIsImageUploading(true)
        const data = new FormData()
        const cloudName = "djnqknlh6"
        if (image) {
            data.append("file", image)
        }
        data.append("upload_preset", "fm7tbjmq")
        data.append("cloud_name", "djnqknlh6")
        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
            {
                method: "POST",
                body: data,
            }
        )
        const resJson = await res.json()
        setGroupImage(resJson.url.toString())
        setIsImageUploading(false)
    }

    return (
        <div className="w-full h-full">
            <div className="flex items-center space-x-10 pt-16 px-10 pb-5">
                <BsArrowLeft className="cursor-pointer text-2xl font-bold" />
                <p className="text-xl font-semibold">New Group</p>
            </div>
            <div className="flex flex-col justify-center items-center my-12">
                <label htmlFor="ImgInput" className="cursor-pointer">
                    <img
                        className="h-[10rem] w-[10rem] rounded-full"
                        src={
                            groupImage ||
                            "https://cdn.pixabay.com/photo/2023/04/03/18/35/nature-7897648_1280.jpg"
                        }
                    />
                    {IsImageUploading && (
                        <Progress className="absolute top-0 left-[6rem]" />
                    )}
                </label>
                <Input
                    type="file"
                    id="ImgInput"
                    className="hidden"
                    onChange={async (e) =>
                        await uploadToCloudinary(
                            e.target.files ? e.target.files[0] : null
                        )
                    }
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
                    <Button
                        onClick={() => handleCreateGroup()}
                        className=" p-0 rounded-full w-fit h-fit"
                    >
                        {" "}
                        <div className="bg-[#0c977d] rounded-full p-4">
                            <BsCheck2 className="font-bold text-3xl" />
                        </div>{" "}
                    </Button>
                </div>
            )}
        </div>
    )
}
