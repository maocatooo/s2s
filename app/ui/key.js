"use client"

import { useState, useEffect, useContext, useRef } from "react"
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {OpenContext} from "@/app/context";
import {setSecretKey, getSecretKey} from "@/app/storage";
import { validators } from "tailwind-merge";


function DialogCloseButton({ }) {
    const valueRef = useRef(null)
    const {openKey,setOpenKey, secret, setSecret} = useContext(OpenContext)
    return (
        <Dialog open={openKey} onOpenChange={setOpenKey}>
            <DialogTrigger asChild>
                <Button onClick={() => {
                    setOpenKey(t => !t)
                }} >key: {secret ? "******" : "------"}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Set SecretKey</DialogTitle>
                    <DialogDescription>
                        set your custom SecretKey.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input
                            ref={valueRef}
                            id="link"
                            defaultValue={secret}
                        />
                    </div>
                    <DialogClose asChild>
                        <Button type="submit" size="sm" className="px-3" onClick={() => {
                            setSecretKey(valueRef.current.value)
                            setSecret(valueRef.current.value)
                        }}>
                            <span >Save</span>
                        </Button>
                    </DialogClose>
                </div>

                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export default function Key() {

    return (
        <>
            <div >
                < DialogCloseButton  />
            </div>
            <div>
            </div>
        </>
    );
}

