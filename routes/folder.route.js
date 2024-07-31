const express = require("express");
const router = express.Router();

const {
	createFolder,
	getFolders,
	updateFolder,
	deleteFolder,
	getFoldersByUser,
	getFolderId,
} = require("../controllers/folder.controller");

const auth = require("../middlewares/auth.middleware");

// Create a new folder
router.post("/createfolder/:id", auth, createFolder);

router.get("/getfolders", auth, getFolders);

router.put("/updatefolder/:id", auth, updateFolder);

router.delete("/deletefolder/:id", auth, deleteFolder);

router.get("/user/:userId", getFoldersByUser);

router.get("/getfolderid", auth, getFolderId);

module.exports = router;
