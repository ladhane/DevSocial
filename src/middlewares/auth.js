const authUser = (req, res, next) => {
    let token = req.headers.token
    if(token === 'abc'){
        next()
    }else{
        res.status(401).send('Unauthorized')
    }
}

module.exports = {
    authUser
}