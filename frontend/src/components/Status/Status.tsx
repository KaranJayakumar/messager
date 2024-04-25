import { StatusUserCard } from "./StatusUserCard"

export const Status = () => {
    return (
        <div>
            <div className="flex items-center px-[14vw] py-[7vh]">
                <div className="left h-[85vh] lg:[30%] w-[50%] px-5 bg-[#1e262c]">
                    <div className="pt-5 h-[13%]">
                        <StatusUserCard />
                    </div>
                    <hr />
                    <div className="overflow-y-scroll h-[86%] pt-2">
                        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item) => (
                            <StatusUserCard />
                        ))}
                    </div>
                </div>
                <div className="right relative h-[85vh] lg:w-[70%] w-[50%] bg-[#0b141a]"></div>
            </div>
        </div>
    )
}
