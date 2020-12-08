// Home controller

exports.index = (req, res, next) => {
    res.locals.user[0].map(el => {
        console.log(el);
    })
    res.send("test");    
}

// edit to work with jwt

exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1});
    res.redirect('/');
}