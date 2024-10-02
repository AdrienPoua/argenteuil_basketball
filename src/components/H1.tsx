import React, { ReactElement } from 'react'

type PropsType = {
    children: React.ReactNode;
};
export default function Index({ children }: Readonly<PropsType>): ReactElement {
    return (
        <div
            className="bg-[url('/images/background.jpg')] flex justify-center items-center mb-10 max-w-[80%] py-5 overflow-hidden mx-auto"
        >
            <h1
                className=" text-xl md:text-5xl text-center text-white"
            >
                {children}
            </h1>
        </div>
    )
}
