import { useState, useContext , useEffect} from "react";
import { useAsyncEffect } from "ahooks";
import { Button } from "@/components/ui/button";
import {setSecretKey, getSecretKey} from "@/app/storage";
import {OpenContext} from "@/app/context";
import { encrypt, decrypt, md5 } from "@/app/data/encrypt"


export default  function FileTree() {
    const [data,setData] = useState([])
    const {setOpenKey, secret, fileHandle, setFileHandle} = useContext(OpenContext)

    useAsyncEffect(async ()=>{
        setFileHandle({})
        if (!secret){
          setData([])
          return
        }
        const resp = await fetch("/api/fileTree",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json' 
            },
            body: JSON.stringify({s:md5(secret)}) 
          })
        const listFiles = await resp.json()
        setData(listFiles.list.map((item)=>{
          return {
            meta:item,
            isNew:false,
          }
        }))
    }, [secret])

    useEffect(()=>{
      setData(t=>t.map((item)=>{
        if (item.meta == fileHandle.meta){
            return fileHandle
        }
        return item
      }))
    }, [fileHandle])

    return (
      <> 
        <div>
          <Button className="mb-4" onClick={()=>{
            if (!getSecretKey()) {
              setOpenKey(true)
              return
            }
            const info = {
              meta:new Date().getTime().toString(),
              isNew:true,
            }
            setData(t=>[...t,info])
            setFileHandle(info)
          }}>
          new file
          </Button>
        </div>
        <div>

        {data.map((item)=>{
         return <div key={item.meta} className="cursor-pointer" onClick={()=>{
          setFileHandle(item)
         }}>{item.meta}</div>
      })} 
        </div>
      </>
    );
  }
  