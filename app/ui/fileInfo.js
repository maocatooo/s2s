
import { useAsyncEffect, useSafeState } from "ahooks";
import { useState, useContext } from "react";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { encrypt, decrypt, md5 } from "@/app/data/encrypt"
import { upload } from "@/app/data/request";
import { Button } from "@/components/ui/button";
import { OpenContext } from "@/app/context";

const readInfo = async (resp, secret) => {
  const reader = resp.body.getReader()
  let dataUint8Arr
  while (1) {
    const { done, value } = await reader.read()
    if (done) {
      break
    }
    let mergedUint8Array
    if (dataUint8Arr) {
      mergedUint8Array = new Uint8Array(dataUint8Arr.length + value.length);
      mergedUint8Array.set(dataUint8Arr);
      mergedUint8Array.set(value, value.length);
    } else {
      mergedUint8Array = new Uint8Array(value.length);
      mergedUint8Array.set(value);
    }
    dataUint8Arr = mergedUint8Array
  }
  return decrypt(dataUint8Arr, secret)
}


export default function Info() {
  const [textValue, setTextValue] = useState("")

  const [currentHandleId, setCurrentHandleId] = useState("")
  const { setOpenKey, secret, fileHandle, setFileHandle } = useContext(OpenContext)
  useAsyncEffect(async () => {
    const { meta, isNew, id } = fileHandle
    if (id == currentHandleId) {
      return
    }
    setCurrentHandleId(id)
    if (!meta || isNew || !secret) {
      setTextValue("");
      return
    }
    const resp = await fetch("/api/fileInfo", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ s: md5(secret), m:meta })
    })
    const text = await readInfo(resp, secret)
    setTextValue(text)
  }, [fileHandle])

  const submitFile = async (fileHandle, data) => {
    if (!secret) {
      setOpenKey(true)
      return
    }
    const { meta,isNew } = fileHandle
    if (!meta) {
      return
    }
    const resp = await upload(md5(secret), meta, encrypt(data, secret))
    if (isNew){
      setFileHandle({ ...fileHandle, isNew: false })
    }
    return meta
  }

  return (
    <>
      <div >
        <div className="w-full max-w-md">
          {/* <label for="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label> */}
          <Textarea className="mt-4" rows={10} placeholder="Enter your message" value={textValue}
            onChange={(e) => {
              setTextValue(e.target.value)
            }} />
        </div>
        <div className="w-full max-w-md">
          <Button className="mt-4" onClick={async () => {
            await submitFile(fileHandle, textValue)
          }}>submit</Button>
        </div>
      </div>
    </>
  );
}
