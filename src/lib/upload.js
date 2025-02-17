export async function upload(ev, callbackFn) {
    const file=ev.target.files[0];
    if(!file) return
    
          const data=new FormData();
          data.append("file",file)
          data.append("upload_preset","linklist")
          data.append("cloud_name","dw9tun9l9")
          const res=await fetch("https://api.cloudinary.com/v1_1/dw9tun9l9/image/upload",{
            method:"POST",
            body: data
          })
          if(!res) return
            const response=await res.json();
            let link=response.url;
            link=link.toString();
            console.log(link);
            callbackFn(link);
}