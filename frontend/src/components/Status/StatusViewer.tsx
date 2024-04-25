import { useState, useEffect, useCallback } from "react"
import { stories } from "./DummyStories"
import { Progress } from "../ui/progress"

export const StatusViewer = () => {
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
    const [activeIndex, setActiveIndex] = useState(0)
    const [currStoryProgress, setCurrStoryProgress] = useState(0)

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
                setCurrStoryProgress(currStoryProgress + 10)
            } else {
                handleNextStory()
            }
        }, 100)
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
                            <Progress
                                value={
                                    currentStoryIndex ? currStoryProgress : 0
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
