const authorModel = require("../models/authorModel")
const jwt = require("jsonwebtoken")
let regexValidation = /^[a-zA-Z]+([\s][a-zA-Z]+)*$/;
// ==============================================createAuthor==============================================

const createAuthor = async function (req, res) {
    try {
        let data = req.body
        if (!data)
            return res.status(400).send({ status: false, msg: "enter data" })

        let { fname, lname, title, email, password } = data
        if (!fname) { return res.status(400).send({ status: false, msg: "fname is required" }) }
        if (!lname) { return res.status(400).send({ status: false, msg: "lname is required" }) }
        if (!title) { return res.status(400).send({ status: false, msg: "title is required" }) }
        if (!email) { return res.status(400).send({ status: false, msg: "email is required" }) }
        if (!password) { return res.status(400).send({ status: false, msg: "password is required" }) }

        if (typeof fname !== "string" || fname[0] == " " || fname[fname.length - 1] == " " || !fname.match(regexValidation)) {
            return res.status(400).send({ status: false, msg: "please enetr a valid firstname" })
        }
        if (typeof lname !== "string" || lname[0] == " " || lname[lname.length - 1] == " " || !fname.match(regexValidation)) {
            return res.status(400).send({ status: false, msg: "please enetr a valid lastname" })
        }
        if (title !== "Mr" && title !== "Mrs" && title !== "Miss") {
            return res.status(400).send({ status: false, msg: "please enter  Mr or Mrs or Miss" })
        }
        if (password.length > 10 || password.length < 4)
            return res.status(400).send({ status: false, msg: "password should be less than 10 & greater than 4" })

        let findEmail = await authorModel.findOne({ email: email })

        if (findEmail) {
            return res.status(400).send({ status: false, msg: "email id already exsits" })
        }

        let authorCreated = await authorModel.create(data)
        res.status(201).send({ status: true, data: authorCreated })
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }

}

// ================================login=======================================================

const login = async function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    if (!email)
        return res.status(400).send({ status: false, msg: "Please Input Email" });

    if (!password)
        return res.status(400).send({ status: false, msg: "Please Input Password" });

    let authorData = await authorModel.findOne({ email: email, password: password });

    if (!authorData)
        return res.status(400).send({ status: false, msg: "No User Found With These Credentials" });

    let token = jwt.sign({ authorid: authorData._id, email: authorData.email }, "room-no-11");
    res.setHeader("x-api-key", token);
    return res.status(200).send({ status: true, data: { token: token } })
}



module.exports = { createAuthor, login }
