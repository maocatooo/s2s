"use client"
import Image from "next/image";
import FileTree from "@/app/ui/fileTree";
import FileInfo from "@/app/ui/fileInfo";
import Key from "@/app/ui/key";
import { useState } from "react";


export default function Home() {
  const [fileMetaInfo, setFileMetaInfo] = useState("")

  return (
    <>
    <div className="flex h-screen flex-row w-full items-start px-10 pt-10">
      <div className="flex h-full w-3/10 p-4">
        <div><FileTree setFileMetaInfo = {setFileMetaInfo} /></div>
      </div>
      <div className="flex h-full w-7/10  p-4">
        <FileInfo fileMetaInfo={fileMetaInfo}></FileInfo>
      </div>
    </div>

    <Key />
    </>
  );
}

