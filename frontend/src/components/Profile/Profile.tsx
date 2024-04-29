import { useState, KeyboardEvent } from "react"
import { BsArrowLeft, BsCheck2, BsPencil } from "react-icons/bs"
import { Input } from "../ui/input"
import { currentUser, updateUser } from "@/redux/Auth/Action"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { RootState } from "@/redux/store"

export interface ProfileProps {
    handleCloseOpenProfile: () => void
}
export const Profile: React.FC<ProfileProps> = ({ handleCloseOpenProfile }) => {
    const [flag, setFlag] = useState(false)
    const dispatch = useAppDispatch()
    const authState = useAppSelector((store: RootState) => store.auth)
    const [tempPicture, setTempPicture] = useState(
        authState.reqUser?.profilePicture
    )
    const [username, setUsername] = useState(authState.reqUser?.fullName)
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }
    const token = localStorage.getItem("token")
    const handleFlag = () => {
        setFlag(!flag)
    }
    const uploadToCloudinary = async (image: any) => {
        const data = new FormData()
        const cloudName = "djnqknlh6"
        data.append("file", image)
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
        setTempPicture(resJson.url.toString())
        if (authState.reqUser && token && tempPicture) {
            dispatch(
                updateUser({
                    id: authState.reqUser.id,
                    token: token,
                    profile_picture: tempPicture,
                    full_name: authState.reqUser.fullName,
                })
            )
            dispatch(currentUser({ token: token }))
        }
    }
    const handleUpdateName = () => {
        setFlag(!flag)
        if (authState.reqUser && username && token && tempPicture) {
            dispatch(
                updateUser({
                    id: authState.reqUser.id,
                    token: token,
                    profile_picture: tempPicture,
                    full_name: username,
                })
            )
            dispatch(currentUser({ token: token }))
        }
    }
    return (
        <div className="w-full h-full">
            <div className="flex items-center text-white pt-4 pb-5">
                <BsArrowLeft
                    className="cursor-pointer mx-2"
                    onClick={handleCloseOpenProfile}
                />
                <p className="cursor-pointer font-semibold ml-4 pb-1">
                    Profile
                </p>
            </div>
            <div className="flex flex-col justify-center items-center my-12">
                <label htmlFor="imgInput">
                    <img
                        className="rounded-full w-[15vw] h-[vw] cursor-pointer"
                        src={
                            authState.reqUser?.profilePicture ||
                            "https://cdn.pixabay.com/photo/2017/03/28/22/55/night-photograph-2183637_1280.jpg"
                        }
                    />
                </label>
                <input
                    type="file"
                    id="imgInput"
                    className="hidden"
                    onChange={(e) => {
                        uploadToCloudinary(
                            e.target.files ? e.target.files[0] : null
                        )
                    }}
                />
            </div>
            <div className="px-3">
                <p className="py-3">Your Name</p>
                {!flag && (
                    <div className="w-fill flex justify-between items-center">
                        <p className="py-3">{username}</p>
                        <BsPencil
                            onClick={handleFlag}
                            className="cursor-pointer"
                        />
                    </div>
                )}
                {flag && (
                    <div className="w-full flex flex-row justify-between items-center">
                        <Input
                            onChange={handleUsernameChange}
                            value={username}
                            type="text"
                            placeholder="Enter your username"
                            onKeyDown={(e) => {
                                e.key === "Enter" ? handleUpdateName() : ""
                            }}
                        />
                        <BsCheck2
                            onClick={() => handleUpdateName()}
                            className="mx-2 cursor-pointer text-2xl"
                        />
                    </div>
                )}
            </div>
            <div className="px-3 my-5">
                <p className="py-10">This is not your username.</p>
            </div>
        </div>
    )
}
