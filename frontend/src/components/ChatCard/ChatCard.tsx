export const ChatCard = ({
    profilePicture,
    name,
}: {
    profilePicture: string | null
    name: string
}) => {
    return (
        <div className="flex items-center justify-center py-2 group cursor-pointer">
            <div className="w-20%">
                <img
                    className="h-14 w-14 rounded-full"
                    src={
                        profilePicture ||
                        "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png"
                    }
                />
            </div>
            <div className="pl-5 w-[80%]">
                <div className="flex justify-between items-center">
                    <p className="text-lg">{name}</p>
                    <p className="text-sm">Timestamp</p>
                </div>
                <div className="flex justify-between items-center">
                    <p>Message...</p>
                    <div className="flex space-x-2 items-center">
                        <p className="text-xs py-1 px-2 bg-green-500 rounded-full">
                            5
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
