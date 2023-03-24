const Joi = require("joi");

//* Class for handling user credentials
class Credentials {

    //* Constructor to store user email and password as instance variables
    constructor(credentials) {
        this.email = credentials.email;
        this.password = credentials.password;
    }

    //* Static property to store the validation schema using Joi
    static #validationSchema = Joi.object({
        email: Joi.string().required().min(4).max(90),
        password: Joi.string().required().min(3).max(225)
    });

    //* Method to validate the instance against the validation schema
    validate() {
        const result = Credentials.#validationSchema.validate(this, { abortEarly: false });
        console.log("the credentials is: ", result);
        //* Return the error messages if there are any, otherwise return null
        return result.error ? result.error.details.map(err => err.message) : null;
    }
}

//* Export the Credentials class for use in other modules
module.exports = Credentials;
