// import multer from "multer";

// let storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"./public")
//     },
//     filename:(req,file,cb)=>{
//         cb(null,file.originalname)
//     }
// })

// const upload = multer({storage})

// export default upload







import multer from "multer";

// Memory storage works on local and serverless (Vercel)
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;