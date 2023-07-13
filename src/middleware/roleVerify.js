export function roleAdminVerify(req, res, next){
    if (req.session?.admin) {
        return next()
    }
    return res.status(401).send('You are not an admin!')
}
export function roleUserVerify(req, res, next){
    if (req.session?.user) {
        return next()
    }
    return res.status(401).send('You are not an user!')
}

export function rolePremiumVerify(req, res, next) {
    if (req.session?.premium) return res.status(401).send('You cant get your own product')
    return next()
}

export function roleDeleteVerify(req, res, next) {
    if (req.session?.admin) return next()
    if (req.session?.premium) return next()
    return res.status(401).send('You dont have permits')
}