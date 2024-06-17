import { useState } from "react";
import { useAsyncEffect } from "ahooks";

export default  function FileTree({setFileMetaInfo}) {

    const [data,setData] = useState([])
    useAsyncEffect(async ()=>{
        const resp = await fetch("/api/fileTree",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json' 
            },
            body: JSON.stringify({current:"123"}) 
          })
        const listFiles = await resp.json()
        setData(listFiles.list)
    }, [])

    return (
      <> 
        <div onClick={()=>setFileMetaInfo("")}>
        new file
        </div>
        <div>

        {data.map((item)=>{
         return <div key={item} onClick={()=>{
          setFileMetaInfo(item)
         }}>{item}</div>
      })} 
        </div>
      </>
    );
  }
  