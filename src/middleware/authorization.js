function authorization (req, res, next){
    if (req.session?.user || req.session?.admin) {
        return next()
    }
    return res.status(401).send('Log in!')
}

export default authorization