import { useState } from "react"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import { SelectedMember } from "./SelectedMember"
import { Input } from "../ui/input"
import { ChatCard } from "../ChatCard/ChatCard"
import { NewGroup } from "./NewGroup"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { RootState } from "@/redux/store"
import { searchUser } from "@/redux/Auth/Action"
import { User } from "@/types"

export const CreateGroup = () => {
    const [newGroup, setNewGroup] = useState(false)
    const [groupMember, setGroupMember] = useState<Set<User>>(new Set())
    const [searchQuery, setSearchQuery] = useState("")
    const authState = useAppSelector((store: RootState) => store.auth)
    const token = localStorage.getItem("token")
    const dispatch = useAppDispatch()

    const handleRemoveMember = (item) => {
        const updatedGroupMember = new Set(groupMember)
        updatedGroupMember.delete(item)
        setGroupMember(updatedGroupMember)
    }

    const handleSearch = (query: string) => {
        setSearchQuery(query)
        if (token) {
            dispatch(searchUser({ query: query, token: token }))
        }
    }

    return (
        <div className="w-full h-full">
            {!newGroup && (
                <div className="">
                    <div className="flex items-center space-x-10 pt-16 pb-5">
                        <BsArrowLeft className="cursor-pointer text-2xl font-bold" />
                        <p className="text-xl font-semibold">
                            Add group participants
                        </p>
                    </div>
                    <div className="relative py-4 px-3">
                        <div className="flex space-x-2 flex-wrap space-y-1">
                            {Array.from(groupMember).map((item: User) => (
                                <SelectedMember
                                    key={item.id}
                                    handleRemoveMember={handleRemoveMember}
                                    member={item}
                                />
                            ))}
                        </div>
                        <Input
                            type="text"
                            onChange={(e) => {
                                handleSearch(e.target.value)
                            }}
                            className="outline border-b p-2 w-[93%]"
                            placeholder="Search for your friends!"
                        />
                    </div>
                    <div className="overflow-y-scroll h-[50.2vh]">
                        {searchQuery &&
                            authState.searchUser &&
                            Array.isArray(authState.searchUser) &&
                            authState.searchUser.map((item: User) => (
                                <div
                                    onClick={() => {
                                        const updatedGroupMember = new Set(
                                            groupMember
                                        )
                                        updatedGroupMember.add(item)
                                        setGroupMember(updatedGroupMember)
                                        setSearchQuery("")
                                    }}
                                    key={item.id}
                                >
                                    <hr />
                                    <ChatCard
                                        profilePicture={item.profilePicture}
                                        name={item.fullName}
                                    />
                                </div>
                            ))}
                    </div>
                    <div className="bottom-10 items-center justify-center flex">
                        <div
                            className="bg-green-600 rounded-full p-4 cursor-pointer"
                            onClick={() => {
                                setNewGroup(true)
                            }}
                        >
                            <BsArrowRight className="font-bold text-3xl" />
                        </div>
                    </div>
                </div>
            )}
            {newGroup && <NewGroup />}
        </div>
    )
}
