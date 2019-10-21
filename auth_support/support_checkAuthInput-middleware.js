module.exports = (req, res, next)=>{
    if (!req.body || !req.body.username_s || !req.body.email ||!req.body.password) {
        res.status(404).json({message:"Missing register info: username_s,email,or password"})
    } else {
        next();
    }
}