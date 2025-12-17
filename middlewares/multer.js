// import multer from "multer";

// let storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "./public")
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     }
// })

// const upload = multer({ storage })

// export default upload



import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 100 * 1024 * 1024 // 100MB (videos)
    }
});

export default upload;