import { useState } from "react"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import { SelectedMember } from "./SelectedMember"
import { Input } from "../ui/input"
import { ChatCard } from "../ChatCard/ChatCard"
import { NewGroup } from "./NewGroup"
export const CreateGroup = () => {
    const [newGroup, setNewGroup] = useState(false)
    const [groupMember, setGroupMember] = useState(new Set())
    const [searchQuery, setSearchQuery] = useState("")
    const handleRemoveMember = (item: number | unknown) => {
        groupMember.delete(item)
        setGroupMember(groupMember)
    }
    const handleSearch = (searchQuery: string) => {}
    return (
        <div className="w-full h-full">
            {!newGroup && (
                <div>
                    <div className="flex items-center space-x-10 pt-16 pb-5">
                        <BsArrowLeft className="cursor-pointer text-2xl font-bold" />
                        <p className="text-xl font-semibold">
                            Add group participants
                        </p>
                    </div>
                    <div className="relative py-4 px-3">
                        <div className="flex space-x-2 flex-wrap space-y-1">
                            {groupMember.size > 0 &&
                                Array.from(groupMember).map(
                                    (item: number | unknown) => (
                                        <SelectedMember
                                            handleRemoveMember={() =>
                                                handleRemoveMember(item)
                                            }
                                            member={item}
                                        />
                                    )
                                )}
                        </div>
                        <Input
                            type="text"
                            onChange={(e) => {
                                handleSearch(e.target.value)
                                setSearchQuery(e.target.value)
                            }}
                            className="outline border-b p-2 w-[93%]"
                            placeholder="Search for your friends!"
                        />
                    </div>
                    <div className="overflow-y-scroll h-[50.2vh]">
                        {searchQuery &&
                            [1, 1, 1, 1].map((item) => (
                                <div
                                    onClick={() => {
                                        groupMember.add(item)
                                        setGroupMember(groupMember)
                                        setSearchQuery("")
                                    }}
                                >
                                    <hr />
                                    <ChatCard />
                                </div>
                            ))}
                    </div>
                    <div className="bottom-10 py-10 items-center justify-center flex">
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
