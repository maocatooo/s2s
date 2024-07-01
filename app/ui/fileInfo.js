
import { useAsyncEffect,useSafeState } from "ahooks";
import { useState } from "react";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {encrypt, decrypt} from "@/app/data/encrypt"
import { upload } from "@/app/data/request";
import { Button } from "@/components/ui/button";

const submitFile = async (name, data) => {
  if (!name){
    name = new Date().getTime().toString()
  }
  const resp = await upload("123", name, encrypt(data, "123333"  ))
  return name
}

export default function Info({fileMetaInfo}) {
    const [textValue,setTextValue] = useState("")
    useAsyncEffect(async ()=>{
      if (!fileMetaInfo){
        return
      }
        const resp = await fetch("/api/fileInfo",{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify({current:"123",name:fileMetaInfo}) 
        })
        const reader = resp.body.getReader()
        setTextValue("");
        let  dataUint8Arr 
        while(1){
          const {done,value} = await reader.read()
          if (done){
            break
          }
          let mergedUint8Array
          if (dataUint8Arr){
            mergedUint8Array = new Uint8Array(dataUint8Arr.length + value.length);
            mergedUint8Array.set(dataUint8Arr);
            mergedUint8Array.set(value, value.length);
          }else{
            mergedUint8Array = new Uint8Array(value.length);
            mergedUint8Array.set(value);
          }
          dataUint8Arr = mergedUint8Array
        }
        setTextValue(decrypt(dataUint8Arr, "123333"))
    },[fileMetaInfo])

    return (
      <> 
      <div >
          <div className="w-full max-w-md">
              {/* <label for="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label> */}
              <Textarea className="mt-4" rows={10} placeholder="Enter your message" value={textValue}
              onChange={(e)=>{
                setTextValue(e.target.value)
              }}/>
              </div>
          <div  className="w-full max-w-md">
            <Button className="mt-4" onClick={async ()=>{
              await submitFile(fileMetaInfo, textValue)
            }}>submit</Button>
          </div>
      </div>
      </>
    );
  }
  