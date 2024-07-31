const express = require("express");
const router = express.Router();

const {
	saveForm,
	getFormByUser,
	fetchByUniqueUrl,
	getFormsByFolder,
	updateTheme,
	deleteForm,
	fetchForm,
	updateForm,
} = require("../controllers/form.controller");
const auth = require("../middlewares/auth.middleware");
const updateViewCount = require("../middlewares/viewCount.middleware");

router.post("/saveform", auth, saveForm);
router.get("/fetchform/:formId", fetchForm);
router.delete("/deleteform/:id", auth, deleteForm);
router.get("/user/:userId", getFormByUser);
router.get("/fetchByUniqueUrl/:uniqueUrl", updateViewCount, fetchByUniqueUrl);
router.get("/folder/:folderId", getFormsByFolder);
router.put("/updateTheme/:formId", auth, updateTheme);

router.put("/updateform/:formId", auth, updateForm);

module.exports = router;
