// import { v2 as cloudinary } from 'cloudinary';
// import fs from "fs"
// const uploadOnCloudinary = async(filePath)=>{
//     cloudinary.config({ 
//         cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//         api_key:process.env.CLOUDINARY_API_KEY , 
//         api_secret: process.env.CLOUDINARY_API_SECRET 
//     });
//     try {
//        if(!filePath){
//         return null
//        } 
//        const uploadResult = await cloudinary.uploader.upload(filePath,{resource_type:'auto'})
//        fs.unlinkSync(filePath)
//        return uploadResult.secure_url
//     } catch (error) {
//         fs.unlinkSync(filePath)
//         console.log(error);

//     }
// }
// export default uploadOnCloudinary


import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = (fileBuffer, filename) => {
    return new Promise((resolve, reject) => {
        if (!fileBuffer) return resolve(null);

        const stream = cloudinary.uploader.upload_stream({ resource_type: "auto", public_id: filename },
            (error, result) => {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    resolve(result.secure_url);
                }
            }
        );

        stream.end(fileBuffer); // send buffer to Cloudinary
    });
};

export default uploadOnCloudinary;