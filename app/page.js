"use client"
import Image from "next/image";
import FileTree from "@/app/ui/fileTree";
import FileInfo from "@/app/ui/fileInfo";
import Key from "@/app/ui/key";
import { useState, useContext, createContext, useEffect } from "react";
import {OpenContext} from "@/app/context";

import {getSecretKey} from "@/app/storage"


export default function Home() {
  const [fileHandle, setFileHandle] = useState({})
  const [openKey, setOpenKey] = useState(false)
  const [secret, setSecret] = useState("")

  useEffect(()=>{
    setSecret(getSecretKey())
  }, [])
  return (
    <>
      <OpenContext.Provider value={{openKey, setOpenKey, secret, setSecret, fileHandle, setFileHandle}}>
        <div className="flex h-screen flex-row w-full items-start px-32 py-10 ">
          <div className="flex h-full w-3/10 p-4 border-r">
            <div><FileTree  /></div>
          </div>
          <div className="flex h-full w-7/10  p-4">
            <FileInfo />
          </div>
        </div>
        <div className="fixed bottom-0 left-0">
          <Key  />
        </div>
      </OpenContext.Provider>
    </>
  );
}

