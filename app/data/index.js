import fs from 'fs';
import path from 'path';

const ROOT_PATH = process.env.ROOT_PATH

export function list({s}) {
    const cp = path.join(ROOT_PATH, s)
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

export function content({s, m}) {
    const cp = path.join(ROOT_PATH, s,  m)
    try{
        return fs.readFileSync(cp )
    }catch(e){
        Promise.reject(e)
    }
    return ""
}


export function write({s, m, data}) {
    const cp = path.join(ROOT_PATH, s, m)
    try{
        return fs.writeFileSync(cp, data )
    }catch(e){
        Promise.reject(e)
    }
    return ""
}