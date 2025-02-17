'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactSortable } from "react-sortablejs";
import SectionBox from "../layout/SectionBox";
import { faEnvelope, faGripLines, faMobile, faPlus, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faDiscord, faFacebook, faGithub, faInstagram, faTelegram, faTiktok, faWhatsapp, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import SubmitButton from "../buttons/SubmitButton";
import { savePageButtons } from "@/actions/pageActions";
import toast from "react-hot-toast";

const allButtons=[
    {key: 'email', 'label': 'E-mail',icon: faEnvelope , placeholder: 'johnDoe@gmail.com'},
    {key: 'instagram', 'label': 'Instagram',icon: faInstagram ,placeholder: 'https://instagram.com/profile/...'},
    {key: 'mobile', 'label': 'Mobile',icon: faMobile, placeholder: '+91 0123456789'},
    {key: 'facebook', 'label': 'Facebook',icon: faFacebook ,placeholder: 'https://facebook.com/profile/...'},
    {key: 'discord', 'label': 'Discord',icon: faDiscord},
    {key: 'tiktok', 'label': 'Tiktok',icon: faTiktok},
    {key: 'youtube', 'label': 'Youtube',icon: faYoutube},
    {key: 'whatsapp', 'label': 'Whatsapp',icon: faWhatsapp},
    {key: 'github', 'label': 'Github',icon: faGithub},
    {key: 'telegram', 'label': 'Telegram',icon: faTelegram},
]

export default function PageButtonsForm({page, user}){

    const pageSavedButtonKeys=Object.keys(page?.buttons || {});
    const pageSavedButtonsInfo=pageSavedButtonKeys.map(k=> allButtons.find(b=>b.key==k)).filter(Boolean);
    async function saveButtons(formData){
        await savePageButtons(formData);
        toast.success('Settings Saved!');
    }

    const [activeButtons,setActiveButtons]=useState(pageSavedButtonsInfo || []);

    function addButtonToProfile(button){
        setActiveButtons(prevButtons=>{
            return [...prevButtons ,button];
        });
    }
    const availableButtons=allButtons.filter(b1=>!activeButtons.find(b2=> b1.key=== b2.key));
    
    function removeButton({key:keyToRemove}){
        setActiveButtons(prevButtons=>{
            return prevButtons.filter(button=>button.key !== keyToRemove);
        });
    }

    return (
        <SectionBox>
       
        <form action={saveButtons}>
        <h2 className="text-2xl font-bold mb-4 ">Buttons</h2>
        <ReactSortable list={activeButtons} setList={setActiveButtons} handle=".handle">
        {activeButtons.map(b=>(
            <div key={b.key} className="mb-4 md:flex items-center">
              <div className="w-56 flex h-full p-2 gap-2 items-center text-gray-700">
              <FontAwesomeIcon icon={faGripLines} className="cursor-pointer text-gray-400 handle p-2"/>
                <FontAwesomeIcon icon={b.icon}/>
                <span>{b.label}:</span>
              </div>
              <div className="grow flex">
              <input 
              name={b.key}
              defaultValue={page.buttons?.[b.key]||""}
              placeholder={b.placeholder} type="text" style={{marginBottom:'0'}}/>
              <button
              onClick={()=>removeButton(b)}
              type="button"
              className="py-2 px-4 bg-gray-300 cursor-pointer">
              <FontAwesomeIcon icon={faTrash}/>

              </button>
              </div>
            </div>
        ))}
       </ReactSortable>
            <div className="flex flex-wrap gap-2 mt-4 border-y py-4">
            {availableButtons.map(b=>(
                <button
                key={b.key}
                type="button"
                onClick={()=> addButtonToProfile(b)}
                 className="flex items-center gap-1 p-2 bg-gray-200">
                    <FontAwesomeIcon icon={b.icon}/>
                    <span>
                        {b.label}
                    </span>
                    <FontAwesomeIcon icon={faPlus}/>
                </button>
            ))}
                
            </div>
            <div className="max-w-xs mx-auto mt-8">
                <SubmitButton>
                    <FontAwesomeIcon icon={faSave}/>
                    <span>Save</span>
                </SubmitButton>
            </div>
        </form>
        
        </SectionBox>
    )
}