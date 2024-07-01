"use client"

import { useState, useEffect } from "react"
import { CopyIcon } from "@radix-ui/react-icons"
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

const _Key = "SecretKey"

function getSecretKey() {
    return localStorage.getItem(_Key) || ""
}

function setSecretKey(key) {
    localStorage.setItem(_Key, key)
}

function DialogCloseButton({ skey, setKey }) {
    const [inData, setInData] = useState('')


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button >key: {skey ? "******" : "------"}</Button>
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
                            id="link"
                            defaultValue={skey}
                            onChange={(e) => { setInData(e.target.value) }}
                        />
                    </div>
                    <DialogClose asChild>
                        <Button type="submit" size="sm" className="px-3" onClick={() => {
                            setKey(inData)
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


export default function Key({ }) {
    const [skey, setSKey] = useState("")

    useEffect(() => {
        setSKey(getSecretKey())
    }, [])

    const setKey = (k) => {
        setSKey(k)
        setSecretKey(k)
    }
    return (
        <>
            <div className="fixed bottom-0 left-0">
                < DialogCloseButton skey={skey} setKey={setKey} />
            </div>
            <div>
            </div>
        </>
    );
}

