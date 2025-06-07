const {validationResult} = require('express-validator')

const expressValidatorMessage = (req, res, next) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        res.status(400).send({ errors: result.mapped() });
    }else{
        next()
    }
}

module.exports = expressValidatorMessage