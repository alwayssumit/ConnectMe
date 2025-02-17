'use client';
import RightIcon from "@/components/icons/RightIcon";
import grabUsername from "@/actions/grabUsername";
import { useState } from "react";
import SubmitButton from "../buttons/SubmitButton";
import { redirect } from "next/navigation";
export default function UsernameForm({desiredUsername}){
   const [taken,setTaken] =useState(false);
   async function handleSubmit(formData){
    const username = formData.get("username");
    const result = await grabUsername({ username });
    setTaken(result===false)
    if(result){
        redirect('/account?created='+username);
    }
   }
    return(
        <form action={handleSubmit}>
            <h1 className="text-4xl font-bold text-center mb-2">
            Grab your username</h1>
            <p className="text-center mb-6 text-gray-500">
            choose your username</p>
            <div className="max-w-xs mx-auto">
                <input
                name="username"
                 className="block p-2 mx-auto border w-full mb-2 text-center"
                defaultValue={desiredUsername} type="text" placeholder="username"/>
               {taken && (
                <div className="bg-red-100 border border-red-500 p-2 text-center mb-2">
                    This username is taken
                </div>
               )}
                <SubmitButton>
                <span> Claim your username</span>
                <RightIcon/>
                </SubmitButton>
               
            </div>
           </form>
    )
}