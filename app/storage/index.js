const _Key = "SecretKey"

function getSecretKey() {
    return localStorage.getItem(_Key) || ""
}

function setSecretKey(key) {
    localStorage.setItem(_Key, key)
}


export {getSecretKey, setSecretKey}