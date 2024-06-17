import CryptoJS  from "crypto-js"
function uint8ArrayToWordArray(uint8Array) {
    const words = [];
    for (let i = 0; i < uint8Array.length; i += 4) {
        words.push(
            (uint8Array[i] << 24) |
            (uint8Array[i + 1] << 16) |
            (uint8Array[i + 2] << 8) |
            (uint8Array[i + 3])
        );
    }
    return CryptoJS.lib.WordArray.create(words, uint8Array.length);
}

function wordArrayToUint8Array(wordArray) {
    const uint8Array = new Uint8Array(wordArray.sigBytes);
    for (let i = 0; i < wordArray.sigBytes; i++) {
        uint8Array[i] = (wordArray.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
    }
    return uint8Array;
}

export function encrypt(data, key){
    const encrypted = CryptoJS.AES.encrypt(data, key)
    return wordArrayToUint8Array(CryptoJS.enc.Base64.parse(encrypted.toString()))
}

export function decrypt(data, key) {
    const decrypted = CryptoJS.AES.decrypt(CryptoJS.enc.Base64.stringify(uint8ArrayToWordArray(data)), key)
    return decrypted.toString(CryptoJS.enc.Utf8);
}


export function md5(ciphertext, passphrase) {
    var bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
    return bytes.toString(CryptoJS.enc.Utf8);
}