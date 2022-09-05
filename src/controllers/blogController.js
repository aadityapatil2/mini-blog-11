const blogModel = require("../models/blogModel")



const getBlogs = async function (req, res) {

    try {
        let filters = req.query;
        filters["isDeleted"] = false;
        filters["isPublished"] = true;
        let data = await blogModel.find(filters)
        if (!data) res.status(404).send({ status: false, msg: "file not found!" })
        res.status(200).send({ status: true, data: { data } })

    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}
module.exports.getBlogs=getBlogs;