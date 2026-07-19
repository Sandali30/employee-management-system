const errorHandler = (err, req, res, next) => {

    console.error("Error:", err);

    if (err.name === "MulterError") {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    if (err.message === "Only JPG, JPEG and PNG images are allowed.") {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    return res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });

};

module.exports = errorHandler;