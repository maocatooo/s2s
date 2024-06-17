"use client"
import Image from "next/image";
import FileTree from "@/app/ui/fileTree";
import FileInfo from "@/app/ui/fileInfo";
import { useState } from "react";


export default function Home() {
  const [fileMetaInfo, setFileMetaInfo] = useState("")

  return (
    <>
    <div className="flex flex-row w-full items-center">
    <div className="flex-1">
      <FileTree setFileMetaInfo = {setFileMetaInfo}></FileTree>
    </div>
    <div className="flex-1">
      <FileInfo fileMetaInfo={fileMetaInfo}></FileInfo>
    </div>
    </div>
    </>
  );
}

