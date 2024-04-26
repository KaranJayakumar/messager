import { AiOutlineClose } from "react-icons/ai"

interface SelectedMemberProps {
    handleRemoveMember: (item: number | unknown) => void
    member: number | unknown
}
export const SelectedMember: React.FC<SelectedMemberProps> = ({
    handleRemoveMember,
    member,
}) => {
    return (
        <div className="flex items-center rounded-full">
            <img
                className="w-7 h-7 rounded-full "
                src="https://cdn.pixabay.com/photo/2018/06/13/18/20/waves-3473335_1280.jpg"
            />
            <p className="px-2">Usernames</p>
            <AiOutlineClose
                onClick={() => handleRemoveMember(member)}
                className="pr-1 cursor-pointer"
            />
        </div>
    )
}
