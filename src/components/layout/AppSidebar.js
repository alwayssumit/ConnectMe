'use client'

import { faArrowLeft, faChartLine } from "@fortawesome/free-solid-svg-icons";
import LogoutButton from "../buttons/LogoutButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { Page } from "@/models/page";





export default function AppSidebar(){

    const path=usePathname();
    
    return(
        <nav  className="inline-flex mx-auto flex-col text-center mt-8 gap-2 
        text-gray-500">
         <Link href={'/account'} 
          className={"flex gap-4 p-2 " +
           (path==="/account"? 'text-blue-500':'')}>

         <FontAwesomeIcon icon={faFileLines} fixedWidth={true} className={'w-6 h-6'}/>
         <span className="">My Page</span>

         </Link>
         <Link href={'/analytics'} 
          className={"flex gap-4 p-2 " +
           (path==="/analytics"? 'text-blue-500':'')}>

         <FontAwesomeIcon icon={faChartLine} fixedWidth={true} className={'w-6 h-6'}/>
         <span className="">Analytics</span>
         </Link>
         <LogoutButton 
           className={"flex gap-4 items-center p-2 text-gray-500"}
           iconLeft={true}
           iconClasses={'w-6 h-6'}
         />
         <Link href={'/'}  className="flex gap-2 items-center text-xs
         text-gray-500 border-t pt-4">
         <FontAwesomeIcon icon={faArrowLeft} className={'w-3 h-3'}/>
         <span className="text-gray-700">Back to website</span>
         </Link>
        </nav>
    )
}