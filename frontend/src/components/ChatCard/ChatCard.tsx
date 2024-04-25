export const ChatCard = () => {
    return (
        <div className="flex items-center justify-center py-2 group cursor-pointer">
            <div className="w-20%">
                <img
                    className="h-14 w-14 rounded-full"
                    src="https://cdn.pixabay.com/photo/2017/02/01/22/02/mountain-landscape-2031539_1280.jpg"
                />
            </div>
            <div className="pl-5 w-[80%]">
                <div className="flex justify-between items-center">
                    <p className="text-lg">Username</p>
                    <p className="text-sm">Timestamp</p>
                </div>
                <div className="">
                    <p>Message...</p>
                    <div></div>
                </div>
            </div>
        </div>
    )
}
