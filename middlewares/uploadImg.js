const multer = require('multer');

// storage defines the storage options to be used for file upload with multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../public/uploads/');
    },
    filename: function(req, file, cb) {
        const original = file.originalname;
        const file_extension = original.split('.');
        // Make the file name the date + the file extension
        filename = Date.now() + '.' + file_extension[file_extension.length-1];
        cb(null, filename);
    },
});
const upload = multer({storage: storage});

module.exports = upload;
