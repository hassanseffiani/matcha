// Home controller

exports.index = (req, res, next) => {
    // show session stored
    res.send(req.session.user);
}

exports.logout = (req ,res, next) => {
    //destroy session user
    if (req.session.user){
        req.session.destroy(() => {
            res.send('Session deleted')
        })
    }else
        res.send('Nothing to delete')
}