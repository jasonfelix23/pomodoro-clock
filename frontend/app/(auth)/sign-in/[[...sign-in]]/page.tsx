import { SignIn } from "@clerk/nextjs";
import { SiClockify } from "react-icons/si";

export default function Page(){
    return (
        <div className="flex flex-col gap-2 justify-center items-center h-screen">
            <SiClockify className="text-muted"size={40}/>
            <SignIn fallbackRedirectUrl="/home"/>
        </div>

    );

}