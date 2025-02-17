'use server';

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/page";
import mongoose, { connect } from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function grabUsername({username}){
    mongoose.connect(process.env.MONGODB_URI)

    const existingPageDoc=await Page.findOne({uri:username});
    if(existingPageDoc){
        return false;
    }else{
        const session=await getServerSession(authOptions);
        const newPage = await Page.create({
            uri: username,
            owner: session?.user?.email,
        });

        return {
            uri: newPage.uri,
            owner: newPage.owner,
        };
    }
}