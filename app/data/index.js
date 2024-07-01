import fs from 'fs';
import path from 'path';

const ROOT_PATH = process.env.ROOT_PATH

export function list({current}) {
    const cp = path.join(ROOT_PATH, current)
    try{
        return fs.readdirSync(cp )
    }catch(e){
        if (e.toString().indexOf("no such file or directory")!==-1){
            fs.mkdirSync(cp, {recursive:true})
            return []
        }
        Promise.reject(e)
    }
}

export function content({current, name}) {
    const cp = path.join(ROOT_PATH, current, name)
    try{
        return fs.readFileSync(cp )
    }catch(e){
        Promise.reject(e)
    }
    return ""
}


export function write({current, name, data}) {
    const cp = path.join(ROOT_PATH, current, name)
    try{
        return fs.writeFileSync(cp, data )
    }catch(e){
        Promise.reject(e)
    }
    return ""
}