import { ReactElement } from "react";

const Instructions = ({ children, className }: { children: React.ReactNode, className?: string }): ReactElement => {
    return (
        <div className="border-2 border-primary border-dashed p-10 rounded-xl relative mb-10">
            <h3 className={`text-primary absolute top-0 left-10 z-10 transform -translate-y-1/2 bg-black ${className}`}>
                Instructions
            </h3>
            <div className="flex flex-col gap-4">
                {children}
            </div>
        </div>
    );
}

export default Instructions;