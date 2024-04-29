import { useEffect, useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import "./HomePage.css"
import { BiCommentDetail } from "react-icons/bi"
import {
    BsEmojiSmile,
    BsFilter,
    BsMicFill,
    BsThreeDots,
    BsThreeDotsVertical,
} from "react-icons/bs"
import { TbCircleDashed } from "react-icons/tb"
import { ChatCard } from "./ChatCard/ChatCard"
import { MessageCard } from "./MessageCard/MessageCard"
import { FaMessage } from "react-icons/fa6"
import { ImAttachment } from "react-icons/im"
import { Profile } from "./Profile/Profile"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Label } from "./ui/label"
import { CreateGroup } from "./Group/CreateGroup"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { currentUser, logout } from "@/redux/Auth/Action"
import { useNavigate } from "react-router-dom"
import { RootState } from "@/redux/store"
import { searchUser } from "@/redux/Auth/Action"
import { createChat, getChatsForUser } from "@/redux/Chat/Action"
import { User } from "@/types"
import { ChatServer } from "@/redux/Chat/types"
import { createMessage, getAllMessages } from "@/redux/Message/Action"

export const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [isGroup, setIsGroup] = useState(false)
    const [currentChat, setCurrentChat] = useState<ChatServer | null>()
    const handleClickOnChatCard = (item: User) => {
        if (token) {
            dispatch(createChat({ userId: item.id, token: token }))
            setSearchQuery("")
        }
    }
    const [content, setContent] = useState("")
    const [isProfile, setIsProfile] = useState(false)
    const handleCreateNewMessage = () => {
        if (currentChat && authState.reqUser && token) {
            dispatch(
                createMessage({
                    content: content,
                    chatId: currentChat.id,
                    userId: authState.reqUser.id,
                    token: token,
                })
            )
        }
        console.log("Message created")
    }
    const handleNavigate = () => {
        setIsProfile(true)
    }
    const handleCloseOpenProfile = () => {
        setIsProfile(false)
    }
    const handleCreateGroup = () => {
        setIsGroup(true)
    }
    const dispatch = useAppDispatch()
    const handleLogout = () => {
        localStorage.removeItem("token")
        dispatch(logout())
    }
    const token = localStorage.getItem("token")
    const authState = useAppSelector((store: RootState) => store.auth)
    const chatState = useAppSelector((store: RootState) => store.chat)
    const messageState = useAppSelector((store: RootState) => store.message)
    const navigate = useNavigate()
    useEffect(() => {
        if (!authState.reqUser) {
            navigate("/signin")
        }
    }, [navigate, authState.reqUser])
    useEffect(() => {
        dispatch(currentUser({ token: token }))
    }, [token, dispatch])

    const handleSearch = (value: string) => {
        console.log(JSON.stringify(authState.searchUser))
        if (value && token) {
            dispatch(searchUser({ query: value, token: token }))
        }
    }
    useEffect(() => {
        if (token) {
            dispatch(getChatsForUser({ token: token }))
        }
    }, [chatState.createdChat, chatState.createdGroup, dispatch, token])
    const handleCurrentChat = (item: ChatServer) => {
        setCurrentChat(item)
    }
    useEffect(() => {
        if (currentChat?.id && token) {
            dispatch(getAllMessages({ token: token, chatId: currentChat.id }))
            console.log("reached refresh")
        }
    }, [currentChat, dispatch, token, messageState.newMessage])

    return (
        <div className="relative">
            <div className="py-14 bg-[#00a884] w-full "></div>
            <div className="flex h-[90vh] bg-[#33302f] absolute top-[3vh] left-[2vw] w-[96vw]">
                <div className="left w-[30%] h-full">
                    {isGroup && <CreateGroup setIsGroup={setIsGroup} />}
                    {isProfile && (
                        <div className="w-full h-full">
                            <Profile
                                handleCloseOpenProfile={handleCloseOpenProfile}
                            />
                        </div>
                    )}
                    {!isProfile && !isGroup && (
                        <div className="w-full">
                            <div className="flex justify-between items-center p-3">
                                <div
                                    onClick={handleNavigate}
                                    className="flex items-center space-x-3"
                                >
                                    <img
                                        className="rounded-full w-10 h-10 cursor-pointer"
                                        src={
                                            authState.reqUser?.profilePicture ||
                                            "https://cdn.pixabay.com/photo/2017/03/28/22/55/night-photograph-2183637_1280.jpg"
                                        }
                                    />
                                    <p>{authState.reqUser?.fullName}</p>
                                </div>
                                <div className="space-x-3 text-2xl flex">
                                    <TbCircleDashed />
                                    <BiCommentDetail />
                                    <Popover>
                                        <PopoverTrigger>
                                            <BsThreeDots />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-15">
                                            <div className="flex flex-col gap-4">
                                                <Label
                                                    onClick={() =>
                                                        setIsProfile(true)
                                                    }
                                                    className="cursor-pointer"
                                                >
                                                    Profile
                                                </Label>
                                                <Label
                                                    onClick={handleCreateGroup}
                                                    className="cursor-pointer"
                                                >
                                                    Create Group
                                                </Label>
                                                <Label
                                                    onClick={handleLogout}
                                                    className="cursor-pointer"
                                                >
                                                    Logout
                                                </Label>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                            <div className="relative flex justify-center items-center py-4 px-3">
                                <input
                                    className="border-none text-black outline-none rounded-md w-[93%] pl-9 py-2"
                                    type="text"
                                    placeholder="Search or start new chat"
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value)
                                        handleSearch(e.target.value)
                                    }}
                                    value={searchQuery}
                                />
                                <AiOutlineSearch className="left-5 top-7 absolute" />
                                <div>
                                    <BsFilter className="ml-4 text-3xl" />
                                </div>
                            </div>
                            <div className="overflow-y-scroll h-[76%]">
                                {searchQuery &&
                                    authState.searchUser?.map((item, index) => (
                                        <div
                                            onClick={() =>
                                                handleClickOnChatCard(item)
                                            }
                                            key={index}
                                        >
                                            <hr />
                                            <ChatCard
                                                profilePicture={
                                                    item.profilePicture
                                                }
                                                name={item.fullName}
                                            />
                                        </div>
                                    ))}
                                {chatState.chats.length > 0 &&
                                    !searchQuery &&
                                    chatState.chats?.map((item, index) => (
                                        <div
                                            onClick={() =>
                                                handleCurrentChat(item)
                                            }
                                            key={index}
                                        >
                                            <hr />
                                            <ChatCard
                                                profilePicture={item.chatImage}
                                                name={
                                                    item?.group
                                                        ? item.chatName
                                                        : authState.reqUser
                                                                ?.id ===
                                                            item.users[0].id
                                                          ? item.users[1]
                                                                .fullName
                                                          : item.users[0]
                                                                .fullName
                                                }
                                            />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
                {!currentChat && (
                    <div className="w-[70%] flex flex-col items-center justify-center h-full">
                        <div className="max-w-[70%] text-center flex flex-col items-center">
                            <FaMessage className="w-20 h-20 my-7" />
                            <h1 className="text-4xl">Messager!</h1>{" "}
                            <p className="my-9">
                                {" "}
                                Send and receive messages online
                            </p>
                        </div>
                    </div>
                )}
                {currentChat && (
                    <div className="w-[70%] relative">
                        <div className="header absolute top-0 w-full">
                            <div className="flex justify-between">
                                <div className="py-3 space-x-4 flex items-center px-3">
                                    src=
                                    {currentChat?.group
                                        ? currentChat.chatImage
                                        : currentChat &&
                                          authState.reqUser &&
                                          (authState.reqUser.id ===
                                          (currentChat.users[0]?.id || null)
                                              ? currentChat.users[1]
                                                    ?.profilePicture ||
                                                "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png"
                                              : currentChat.users[0]
                                                    ?.profilePicture ||
                                                "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png")}
                                    <p>
                                        {currentChat.group
                                            ? currentChat.chatName
                                            : authState.reqUser?.id ==
                                                currentChat.users[0].id
                                              ? currentChat.users[1].fullName
                                              : currentChat.users[0].fullName}
                                    </p>
                                </div>
                                <div className="py-3 space-x-4 flex items-center px-3">
                                    <AiOutlineSearch />
                                    <BsThreeDotsVertical />
                                </div>
                            </div>
                        </div>
                        <div className="px-10 h-[85vh] overflow-y-scroll ">
                            <div className="space-y-1 flex flex-col justify-center mt-20 py-2">
                                {messageState.messages.map((item, i) => (
                                    <MessageCard
                                        key={i}
                                        content={item.content}
                                        isReqUserMessage={
                                            !(
                                                item.user.id ===
                                                authState.reqUser?.id
                                            )
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                        {/*Footer*/}
                        <div className="flex items-center footer absolute bottom-0 w-full py-3 text-xl">
                            <div className="flex justify-between items-center px-5 relative">
                                <BsEmojiSmile className="mx-2 cursor-pointer" />
                                <ImAttachment className="mx-2 cursor-pointer" />
                            </div>
                            <input
                                className="py-2 text-black outline-none border-none pl-4 rounded-full w-[85%]"
                                type="text"
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Type message here"
                                value={content}
                                onKeyDown={(e) => {
                                    if (e.key == "Enter") {
                                        handleCreateNewMessage()
                                    }
                                }}
                            />
                            <BsMicFill className="mx-2" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
