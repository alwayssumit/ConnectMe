import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginWithGoogle from "@/components/buttons/LoginWithGoogle";
import HomePage from "@/components/HomePage";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function LoginPage(){
  const session=await getServerSession(authOptions);
    return(
        <div>
        {!session? (<div className=" p-4 max-w-xs mx-auto">
            <h1 className="text-4xl font-bold text-center mb-2"> Sign In</h1>
            <p className="text-center mb-6 text-gray-500">Sign to your account using one of the methods below</p>
            <LoginWithGoogle/>
          </div>) : (
           <HomePage/>
          )}
          
        </div>
    )
}