// Home controller

exports.index = (req, res, next) => {
    res.locals.user[0].map(el => {
        console.log(el);

    });
    res.send("Home route");    
}