
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./buttons/LogoutButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
export default async function Header(){
    const session=await getServerSession(authOptions);
    return (
        <header className="py-4 bg-white border-b ">
        <div className="max-w-4xl flex justify-between px-6 mx-auto">
        <div className="flex items-center gap-6 ">
      <Link href={"/"} className="flex items-center gap-2 text-blue-500">
      <FontAwesomeIcon icon={faLink} className="text-blue-500"/>
      <span className="font-bold">ConnectMe</span>
      </Link>
      <nav className="flex items-center gap-4 text-slate-500 text-sm">
        <Link href={"/about"}>About</Link>
        <Link href={"/pricing"}>Pricing</Link>
        <Link href={"/contact"}>Contact</Link>
      </nav>
      </div>
      <nav className="flex gap-4 items-center text-sm text-slate-500">
      {!!session && (
        <>
            <Link href={"/account"}>
                Hello, {session?.user?.name}
            </Link>
            <LogoutButton/>
        </>
      )}
      {!session && (
        <>
          <Link href={'/login'}>Sign In</Link>
          <Link href={'/login'}>Create Account</Link>
        </>
      )}
      </nav>
        </div>

    </header>
    )
}