
export const upload = async (au, title,uint8Array)=>{
    fetch('/api/fileInfo', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/octet-stream',
            'a-title':title,
            "a-au":au,
        },
        body: uint8Array
    })
    .then(response => response.text())
    .then(result => {
        console.log('Success:', result);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}