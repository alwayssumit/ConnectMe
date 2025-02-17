import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation";
import UsernameForm from "@/components/forms/UsernameForm";
import { Page } from "@/models/page";
import mongoose from "mongoose";
import PageSettingsForm from "@/components/forms/PageSettingsForm";
import Script from "next/script";
import PageButtonsForm from "@/components/forms/PageButtonsForm";
import PageLinksForm from "@/components/forms/PageLinksForm";
import cloneDeep from "clone-deep";

export default async function AccountPage({searchParams}){
    await mongoose.connect(process.env.MONGODB_URI)
    const session=await getServerSession(authOptions);
    const desiredUsername=searchParams.desiredUsername;
   
    
    if(!session){
        return redirect("/");
    }
    const page= await Page.findOne({owner:session?.user?.email});

    
    if(page){
       const leanPage=cloneDeep(page.toJSON());
       leanPage._id=leanPage._id.toString();
        return(
            <div>
                <PageSettingsForm page={leanPage} user={session.user}/>
                <PageButtonsForm page={leanPage} user={session.user}/>
                <PageLinksForm page={leanPage} user={session.user}/>
            </div>
        );
    }
    return(
        <div>
           <UsernameForm desiredUsername={desiredUsername}/>
        </div>
    )
}