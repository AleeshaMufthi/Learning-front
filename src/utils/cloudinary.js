async function upload(method, body){
    return await fetch(`https://api.cloudinary.com/v1_1/dzhdkfjsw/image/upload`, {
        method,
        body,

    })
}  
 export const handleImageUpload = async (imageData) => {
    console.log(imageData)
    const upload = await fetch(`https://api.cloudinary.com/v1_1/dzhdkfjsw/image/upload`, {
        method: 'POST',
        body: imageData
    })
    return await upload.json()
}

export const uploadVideo = async (videoData) => {
    const res = await fetch(`https://api.cloudinary.com/v1_1/dzhdkfjsw/video/upload`, {
        method: 'POST',
        body: videoData
    })
    return await res.json()
}
export default upload

export const handlefileUpload = async (Data) => {
    console.log(Data)
    const upload = await fetch(`https://api.cloudinary.com/v1_1/df509zm70/upload`, {
        method: 'POST',
        body:Data
    })
    return await upload.json()
}    