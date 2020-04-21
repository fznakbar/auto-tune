const jwt = require(`../helpers/jwt`)
const createError = require(`http-errors`)
const Model = require(`../models`)

module.exports = (req, res, next) => {
    var { token } = req.headers

    try {
        req.user = jwt.verify(token)

        Model.User.findOne({
            where: {
                id: req.user.id
            }
        })
            .then(data => {
                if (data) {
                    next()
                } else {
                    next(createError(401, `Unauthorized User`))
                }
            })
    } catch (err) {
        next(err)
    }
}