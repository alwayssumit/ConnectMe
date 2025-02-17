'use client';
import React, { useEffect, useState } from 'react'
import { faCloudArrowUp, faImage, faPalette, faSave } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image';
import RadioTogglers from '../formItems/RadioTogglers';
import SubmitButton from '../buttons/SubmitButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import savePageSettings from '@/actions/pageActions';
import toast from 'react-hot-toast';
import SectionBox from '../layout/SectionBox';
import { upload } from '@/lib/upload';
export default function PageSettingsForm({page,user}) {

  const [bgType,setBgType]=useState(page.bgType);
  const [bgColor,setBgColor]=useState(page.bgColor);
  const [bgImage, setBgImage] = useState(page.bgImage || "");
  const [profilePic, setProfilePic] = useState(user?.image || '/default-avatar.png');
  async function saveBaseSettings(formData){
    const result=await savePageSettings(formData);
    if(result){
      toast.success("Saved");
    }
  }
  useEffect(() => {
    const inputFile = document.getElementById('avatarIn');
    if (inputFile) {
      inputFile.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
          setProfilePic(URL.createObjectURL(file)); // Update image preview
        }
      });
    }
  }, []);
  async function saveBaseSettings(formData){
    const result=await savePageSettings(formData);
    if(result){
      toast.success("Saved");
    }
  }
  async function handleCoverImageChange(ev) {
    await upload(ev,(link)=>{
      setBgImage(link);
      console.log(link);
    })
    }

    return (
    <div>
    <SectionBox>
    <form action={saveBaseSettings}>
        <div className=' py-4 -m-4 h-96 flex justify-center items-center bg-cover bg-center'
        style={bgType === 'color'
                ? {backgroundColor:bgColor}
                : {backgroundImage:`url(${bgImage})`}}>
          <div>
          <RadioTogglers 
          defaultValue={page.bgType}
           options={[
            {value:'color', icon:faPalette, label:'Color'},
            {value:'image', icon: faImage, label:'Image'}
           ]}
          onChange={val=>setBgType(val)}
           />
            {bgType==='color' && (
              <div className='bg-gray-200 shadow text-gray-700 p-2 mt-2'>
              <div className='flex gap-2 justify-center cursor-pointer'>
                <span>Background color:</span>
                <input 
                type="color" 
                name="bgColor" 
                onChange={ev=> setBgColor(ev.target.value)}
                defaultValue={page.bgColor}/>
              </div>
              </div>
            )}

            {bgType === 'image' && (
                <div className="flex justify-center">
                  <label
                    className="bg-white shadow px-4 py-2 mt-2 flex gap-2">
                    <input type="hidden" name="bgImage" value={bgImage}/>
                    <input
                      type="file"
                      onChange={handleCoverImageChange}
                      className="hidden"/>
                    <div className="flex gap-2 items-center cursor-pointer">
                      <FontAwesomeIcon
                        icon={faCloudArrowUp}
                        className="text-gray-700" />
                      <span>Change image</span>
                    </div>
                  </label>
                </div>
              )}
          </div>
        </div>
        <div className='flex justify-center -mb-12'>
            <div className='relative -top-8 w-[128px] h-[128px]'>
            <div className="overflow-hidden h-full rounded-full border-4 border-white shadow shadow-black/50">
              <Image
            id="profile-pic"
             className="w-[128px] h-[128px] rounded-full border-4 border-white shadow-sm shadow-black/50 object-cover"
             src={profilePic}
            alt="avatar"
            style={{ objectFit: 'cover' }}
            width={128} 
            height={128} 
            />
              </div>
            <label
            htmlFor='avatarIn'
             className='absolute -bottom-2 -right-2 bg-white p-2 rounded-full
             shadow shadow-black/50 aspect-square 
             flex items-center cursor-pointer'>
               <FontAwesomeIcon size='xl' icon={faCloudArrowUp}/>
             </label>
             <input id="avatarIn" type='file' className='hidden'/>
            </div>
        </div>
        <div className='p-0'>
          <label className='input-label'  htmlFor='nameIn'>Display name</label>
          <input 
          type='text' 
          id='nameIn' 
          defaultValue={page.displayName}
          name="displayName"
          placeholder='Sumit'/>
          <label className='input-label' htmlFor='loactionIn'>Location</label>
          <input 
          type='text'
          name="location"
          defaultValue={page.location}
           id='loactionIn'
          placeholder='Somewhere in the world'/>
          <label className='input-label' htmlFor='bioIn'>Bio</label>
          <textarea
           type='text'
            id='bioIn'
            defaultValue={page.bio}
            name="bio"
            placeholder='your bio goes here...'/>
          <div className='max-w-[200px] mx-auto'>
            <SubmitButton>
              <FontAwesomeIcon icon={faSave}/>
              <span>Save</span>
            </SubmitButton>
         </div>
        </div>

      </form>
    </SectionBox>
    </div>
  )
}
