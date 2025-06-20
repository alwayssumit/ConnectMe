import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Event } from "@/models/Event";
import { Page } from "@/models/page";
import { faDiscord, faFacebook, faGithub, faInstagram, faTelegram, faTiktok, faWhatsapp, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLink, faLocationDot, faMobile, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";


export const buttonsIcons={
email:faEnvelope,
instagram: faInstagram,
mobile:faPhone,
facebook:faFacebook,
discord:faDiscord,
tiktok:faTiktok,
youtube:faYoutube,
whatsapp:faWhatsapp,
github:faGithub,
telegram:faTelegram
};
function buttonLink(key,value){
  if(key==='mobile') return 'tel:'+value;
  if(key==='email') return 'mailto:'+value;
  return value;
}



export default async function UserPage({params}){
    const uri=params.uri;
    mongoose.connect(process.env.MONGODB_URI);
    const page=await Page.findOne({uri});
    const session=await getServerSession(authOptions);
    await Event.create({uri:uri,page:uri,type:'view'});
    return(
        <div className="bg-blue-950 text-white min-h-screen">
         <div className="h-80 bg-gray-400 bg-cover bg-center"
        style={page.bgType === 'color'
                ? {backgroundColor:page.bgColor}
                : {backgroundImage:`url(${page.bgImage})`}}></div>
          <div className="aspect-square w-36 h-36 mx-auto relative -top-16 -mb-12">
          <Image
            className="rounded-full w-full h-full object-cover"
            src={session?.user?.image}
            alt='avatar'
            width={256} height={256}
          />
          </div>
        <h2 className="text-2xl text-center mb-1">{page.displayName}</h2>
        <h3 className="text-md flex gap-2 justify-center items-center text-white/70">
        <FontAwesomeIcon className="h-4" icon={faLocationDot}/>
        <span>{page.location}</span>
        </h3>
        <div className="max-w-xs mx-auto text-center my-2">
           <p>{page.bio}</p>
        </div>
        <div className="flex gap-2 justify-center mt-4 pb-4 ">
            {Object.keys(page.buttons).map(buttonKey => (
                <Link key={buttonKey} href={buttonLink(buttonKey,page.buttons[buttonKey])}
                className="rounded-full bg-white text-blue-950 p-2 flex items-center justify-center">
                    <FontAwesomeIcon icon={buttonsIcons[buttonKey]} className="w-5 h-5"/>
                </Link>
            ))}
        </div>
          <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-4 p-4 px-8">
            {page.links.map(link => (
                <Link
                key={link.url}
                target="_blank"
                ping={'api/click?url='+ btoa(link.url)+'&page='+page.uri}
                 className="bg-indigo-800 p-2  flex"
                href={link.url}>
                    <div className=" relative -left-4 
                    w-16 overflow-hidden">
                     <div className="w-16 h-16 bg-blue-700 aspect-squae relative flex items-center justify-center">
                       {link.icon && (
                          <Image src={link.icon} alt={'icon'} width={64} height={64}/>
                        )}
                        {!link.icon && (
                          <FontAwesomeIcon icon={faLink} className="w-8 h-8"/>
                        )}
                     </div>
                      
                    </div>
                    <div className="flex items-center justify-center">
                      <div>
                        <h3>{link.title}</h3>
                        <p className="text-white/50 h-6 overflow-hidden">{link.subtitle}</p>
                      </div>
                        
                    </div>
                </Link>
            ))}
          </div>
        </div>
        
    )
}