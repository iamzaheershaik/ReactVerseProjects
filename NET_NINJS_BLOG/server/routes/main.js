const express = require("express");
const router = express.Router();

router.get("", (req, res) => {
    const locals = {
        title:"Node js Blog",
        description:"This is a Node js Blog created by Zaheer Ahmed"
    }
    res.render("index", { locals });
});
router.get("/about", (req, res) => {
    const locals = {
        title:"About Us",
        description:"Learn more about our Node js Blog"
    }
    res.render("about", { locals } );
});

module.exports = router;