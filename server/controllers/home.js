exports.index = (req, res, next) => {
    res.send(req.session.user);
}

exports.logout = (req ,res, next) => {
    //destroy session user
    req.session.destroy(() => {
        res.send('/')
    })
}