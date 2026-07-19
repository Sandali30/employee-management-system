const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "uploads/profileImages");
    },

    filename: function (req, file, cb) {

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1E9) +
            path.extname(file.originalname);

        cb(null, uniqueName);

    }

});

const fileFilter = (req, file, cb) => {

    const allowedTypes = /jpeg|jpg|png/;

    const isValidExtension = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    const isValidMime = allowedTypes.test(file.mimetype);

    if (isValidExtension && isValidMime) {
        return cb(null, true);
    }

    cb(new Error("Only JPG, JPEG and PNG images are allowed."));
};

const upload = multer({

    storage,

    fileFilter,

    limits: {
        fileSize: 2 * 1024 * 1024
    }

});

module.exports = upload;