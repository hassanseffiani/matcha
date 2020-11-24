exports.index = (req, res, next) => {
    res.send(req.session.user);
}