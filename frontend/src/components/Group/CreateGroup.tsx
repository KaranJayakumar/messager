import { useState } from "react"

export const CreateGroup = () => {
    const [newGroup, setNewGroup] = useState(false)
    return (<div className = "w-full h-full">
    {!newGroup && <div></div>}
    </div>
    )
}

