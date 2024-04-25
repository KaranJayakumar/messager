export const MessageCard = ({
    isReqUserMessage,
    content,
}: {
    isReqUserMessage: boolean
    content: string
}) => {
    return (
        <div
            className={`py-2 px-2 rounded-md max-w-[50%] ${isReqUserMessage ? "self-start " : "self-end"}"}`}
        >
            <p>{content}</p>
            <div></div>
        </div>
    )
}
