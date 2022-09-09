const express = require("express");
const axios = require("axios");
const configuration = require("config");
const router = express.Router();

const reverseGeocoding = async (lat, lon) => {
    let res;

    var config = {
        method: 'get',
        url: `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${configuration.get("App.reverseGeocoding.key")}`,
        headers: { }
    };

    res = await axios(config);
    return res.data;
}

router.post("/reverseGeocode", async (req, res) => {
    let response = await reverseGeocoding(req.body.lat, req.body.lon);
    res.json(response);
});

module.exports = router;
