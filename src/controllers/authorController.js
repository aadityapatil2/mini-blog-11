const authorModel= require("../models/authorModel")

const createAuthor= async function (req, res) {
    try {
        let data= req.body
        let checkEmail = data.email

        let email = await authorModel.findOne({ email: checkEmail })
        if (!email) return res.status(400).send({ status: false, msg: "Email is alredy exists" })
        let savedData= await authorModel.create(data)
        res.status(201).send({msg: savedData})
    } catch (error) {
        res.status(500).send({msg : error.message})
    }
   
}

module.exports.createAuthor =createAuthor

// try {
//     let data = req.body
//     let checkEmail = data.email

//     let email = await authorModel.find({ email: checkEmail })
//     if (email.length < 1) return res.status(400).send({ status: false, msg: "Email is alredy exists" })
//     // console.log(email)


//     let savedData = await authorModel.create(data)
//     res.status(201).send({ msg: savedData })
// } catch (error) {
//     res.status(500).send({ msg: error.message })
// }

// }
