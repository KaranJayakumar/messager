import { useState, useEffect, useCallback } from "react"
import { stories } from "./DummyStories"
import { Progress } from "../ui/progress"
import { BsArrowLeft } from "react-icons/bs"
import { AiOutlineClose } from "react-icons/ai"
import { useNavigate } from "react-router-dom"

export const StatusViewer = () => {
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
    const [activeIndex, setActiveIndex] = useState(0)
    const [currStoryProgress, setCurrStoryProgress] = useState(1)
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate(-1)
    }

    const handleNextStory = useCallback(() => {
        if (currentStoryIndex < stories?.length - 1) {
            setCurrentStoryIndex(currentStoryIndex + 1)
            setActiveIndex(activeIndex + 1)
        } else {
            setCurrentStoryIndex(0)
            setActiveIndex(0)
        }
        setCurrStoryProgress(0)
    }, [currentStoryIndex, activeIndex])

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (currStoryProgress < 100) {
                setCurrStoryProgress(currStoryProgress + 5)
            } else {
                handleNextStory()
            }
        }, 50)
        return () => clearInterval(intervalId)
    }, [currStoryProgress, handleNextStory])
    return (
        <div>
            <div>
                <div className="relative flex justify-center items-center h-[100vh]">
                    <div className="relative">
                        <img
                            className="max-h-[96vh] object-contain"
                            src={stories?.[currentStoryIndex].image}
                            alt=""
                        />
                        <div className="flex absolute top-0 w-full h-[20px] ">
                            {stories?.map((item, index) => (
                                <Progress
                                    key={index}
                                    value={
                                        index === currentStoryIndex
                                            ? currStoryProgress
                                            : 0
                                    }
                                />
                            ))}
                        </div>
                        <div>
                            <BsArrowLeft
                                onClick={handleNavigate}
                                className="text-white text-4xl cursor-pointer absolute top-[1.7rem] left-5"
                            />
                            <AiOutlineClose
                                onClick={handleNavigate}
                                className="text-4xl cursor-pointer absolute top-[1.7rem] right-5 "
                            ></AiOutlineClose>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
