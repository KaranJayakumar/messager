import { useNavigate } from "react-router-dom"

export const StatusUserCard = () => {
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate("/status/{userId}")
    }
    return (
        <div className="flex items-center p-3 ">
            <div>
                <img
                    className="h-7 w-7 lg:w-10 lg:h-10 rounded-full"
                    src="https://cdn.pixabay.com/photo/2017/05/09/03/47/deck-2297211_960_720.jpg"
                />
            </div>
            <div className="">
                <p>Pablo Jones</p>
            </div>
        </div>
    )
}
