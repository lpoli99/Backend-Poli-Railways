export function userValidation (req, res, next){
    const { first_name, last_name, age, role = 'user', email, password } = req.body

    if (first_name === '' || last_name === '' || age === '' || role === '' || email === '' || password === '') {
        return res.status(401).send('Fill all blank spaces!')
    }
    return next()
}