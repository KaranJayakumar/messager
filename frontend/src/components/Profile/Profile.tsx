import { useState } from "react"
import { BsArrowLeft, BsCheck2, BsPencil } from "react-icons/bs"
import { Input } from "../ui/input"

export interface ProfileProps {
    handleCloseOpenProfile: () => void
}
export const Profile: React.FC<ProfileProps> = ({ handleCloseOpenProfile }) => {
    const [flag, setFlag] = useState(false)
    const handleFlag = () => {
        setFlag(!flag)
    }
    const [username, setUsername] = useState("")
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
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
                <label htmlFor="">
                    <img
                        className="rounded-full w-[15vw] h-[vw] cursor-pointer"
                        src="https://cdn.pixabay.com/photo/2017/03/28/22/55/night-photograph-2183637_1280.jpg"
                    />
                </label>
                <input type="text" id="imgInput" className="hidden" />
            </div>
            <div className="px-3">
                <p className="py-3">Your Name</p>
                {!flag && (
                    <div className="w-fill flex justify-between items-center">
                        <p className="py-3">{username || "Username"}</p>
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
                        />
                        <BsCheck2
                            onClick={handleFlag}
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
