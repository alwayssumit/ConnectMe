'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionBox from "../layout/SectionBox";
import { faCloudArrowUp, faGripLines, faLink, faPlus, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import SubmitButton from "../buttons/SubmitButton";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { savePageLinks } from "@/actions/pageActions";
import toast from "react-hot-toast";

export default function PageLinksForm({page,user}){
    const [links,setLinks]=useState(page.links || []);

    async function save(){ 
        await savePageLinks(links);
        toast.success('Saved!'); 
    }
    function addNewLink(){
        setLinks(prev=>{
            return (
                [...prev , {
                    key: Date.now().toString(),
                    title:'',subtitle:'', icon:'',link:''}]
            )
        })
    }

    function handleLinkChange(keyOfLinkToChange,prop,ev){
        setLinks(prev=>{
            const newLinks=[...prev];
            newLinks.forEach((link)=>{if(link.key===keyOfLinkToChange){
                link[prop]=ev.target.value;
            }
            });
            return [...prev];
        })
    }
    function removelink(linkKeyToRemove){
        setLinks(prevLinks=>
        [...prevLinks].filter(l=>l.key !==linkKeyToRemove)
        );
      
    }
    
    return (
        <SectionBox>
        <form action={save}>
          <h2 className="text-2xl font-bold mb-4"> Links</h2>
          <button
          onClick={addNewLink} 
          type="button" className="text-blue-500 text-lg flex gap-2
           items-center cursor-pointer">
            <FontAwesomeIcon className="bg-blue-500 text-white p-1 rounded-full aspect-square" icon={faPlus}/>
            <span>Add new</span>
           </button>
           <div>
           <ReactSortable list={links} setList={setLinks}
           handle=".handle">
              {links.map(l=>(
                <div key={l.key} className="mt-8 md:flex gap-6 items-center">
                   <div className="handle">
                    <FontAwesomeIcon className="text-gray-700 mr-2 cursor-ns-resize" icon={faGripLines}/>
                   </div>
                    <div className="text-center">
                        <div className="bg-gray-300 p-4 rounded-full inline-block">
                            <FontAwesomeIcon icon={faLink}/>
                        </div>
                        <div>
                            <button type="button" className="border mt-2 py-2 px-6 flex
                            items-center gap-1 justify-center mb-2 cursor-pointer text-gray-600">
                                <FontAwesomeIcon icon={faCloudArrowUp}/>
                                <span>Change icon</span>
                            </button>
                            <button 
                            onClick={()=>removelink(l.key)}
                            type="button" className="w-full bg-gray-300 py-2 px-3 mb-2 h-full flex gap-2 items-center justify-center">
                                <FontAwesomeIcon icon={faTrash}/>
                                <span>Remove this link</span>
                            </button>
                        </div>
                        
                        
                    </div>
                    <div className="grow">
                    <label className="input-label">Title:</label>
                        <input
                        value={l.title}
                        onChange={ev=>handleLinkChange(l.key,'title',ev)}
                         type="text" placeholder="title"/>
                        <label className="input-label">Subtitle:</label>
                        <input value={l.subtitle}
                        onChange={ev=>handleLinkChange(l.key,'subtitle',ev)}
                        type="text" placeholder="subtitle(optional)"/>
                        <label className="input-label">URL:</label>
                        <input 
                        value={l.url}
                        onChange={ev=>handleLinkChange(l.key,'url',ev)}
                        type="text" placeholder="url"/>
                    </div>
                </div>
              ))}
              </ReactSortable>
           </div>

           <div className="border-t pt-4 mt-4">
             <SubmitButton className="max-w-xs mx-auto">
                <FontAwesomeIcon icon={faSave}/>
                <span>Save</span>
             </SubmitButton>
           </div>
        </form>
        </SectionBox>
       
    )
}