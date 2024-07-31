const express = require("express");
const router = express.Router();
const {
	saveResponse,
	getFormResponses,
} = require("../controllers/formdata.controller");

router.post("/saveResponse/:uniqueUrl", saveResponse);
router.get("/form/:formId/responses", getFormResponses);

module.exports = router;
