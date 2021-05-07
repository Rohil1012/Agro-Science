

module.exports.uploads = (req, res, next) => {
    const files = req.files;
    if (files) {
        const error = new Error("Please Choose files");
        error.httpStatusCode = 400;
        return next(error);
    }
    res.json(files);
}