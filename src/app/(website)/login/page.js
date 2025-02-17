import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginWithGoogle from "@/components/buttons/LoginWithGoogle";
import { getServerSession } from "next-auth";
import Link from "next/link";

const session=getServerSession(authOptions);


export default function LoginPage(){
    return(
        <div>
        {session ?(
          <div className=" p-4 max-w-xs mx-auto">
            <h1 className="text-4xl font-bold text-center mb-2"> Sign In</h1>
            <p className="text-center mb-6 text-gray-500">Sign to your account using one of the methods below</p>
            <LoginWithGoogle/>
          </div>
        ):(<Link href="/account">
            Hello, {session.user?.name}
          </Link>)} 
        </div>
    )
}