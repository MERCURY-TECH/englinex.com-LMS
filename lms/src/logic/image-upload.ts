/**
 * @author Mercury-Tech
 * @since may 2023
 * @description Uses multer to upload images. 
 */

import path from "path";
import multer = require("multer");

const storageEngine = multer.diskStorage({
    destination:path.join(__dirname,'../../images'),
    filename: (req: any, file: any, callback: any) => {
        req.uploadedImageURI = path.join('/images',+Date.now()+path.extname(file.originalname));
        callback(null,Date.now()+path.extname(file.originalname));
    },
});

const checkFileType = function (file: any, callback: any) {
    const fileTypes = /jpeg|jpg|png|gif|svg/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if (mimeType && extName) return callback(null, true);
    else callback("Error: You can Only Upload Images!!");
};

export const upload = multer({
    storage: storageEngine,
    limits: { fileSize: 100000000 },
    fileFilter: (req:any, file:any, cb:any) => {
        checkFileType(file, cb);
    },
});