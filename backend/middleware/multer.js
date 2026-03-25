import multer from "multer";


//create a storage and fileName properties obj
const storage = multer.diskStorage({
    filename: function(req, file, callback){
        callback(null, file.originalname);     
    }

});

// create an uploader to storage the above obj

        const upload = multer({storage});

        export default upload;

        // use this 'upload' in the productRoute