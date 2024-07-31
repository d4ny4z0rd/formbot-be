const mongoose = require("mongoose");
const Folder = require("../models/folder.model");
const User = require("../models/user.model");

const createFolder = async (req, res) => {
	try {
		const { foldername } = req.body;
		const user = req.user.userId;

		if (!foldername) {
			return res.status(400).json({ message: "Folder name is required" });
		}

		const existingFolder = await Folder.findOne({ foldername, user });
		if (existingFolder) {
			return res.status(400).json({ message: "Folder already exists" });
		}

		const newFolder = new Folder({ foldername, user });
		await newFolder.save();

		res
			.status(201)
			.json({ message: "Folder created successfully", folder: newFolder });
	} catch (error) {
		res.status(500).json({ message: "Error creating folder", error });
	}
};

// Get all folders
const getFolders = async (req, res) => {
	try {
		const folders = await Folder.find({});
		res.status(200).json({ message: "Folders fetched successfully", folders });
	} catch (error) {
		res.status(500).json({ message: "Error fetching folders", error });
	}
};

// Update a folder by ID
const updateFolder = async (req, res) => {
	try {
		const { id } = req.params;
		const { foldername } = req.body;
		const updatedFolder = await Folder.findByIdAndUpdate(
			id,
			{ foldername },
			{ new: true, runValidators: true }
		);
		if (!updatedFolder) {
			return res.status(404).json({ message: "Folder not found" });
		}
		res
			.status(200)
			.json({ message: "Folder updated successfully", folder: updatedFolder });
	} catch (error) {
		res.status(500).json({ message: "Error updating folder", error });
	}
};

// Delete a folder by ID
const deleteFolder = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedFolder = await Folder.findByIdAndDelete(id);
		if (!deletedFolder) {
			return res.status(404).json({ message: "Folder not found" });
		}
		res.status(200).json({ message: "Folder deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Error deleting folder", error });
	}
};

const getFoldersByUser = async (req, res) => {
	try {
		const userId = req.params.userId;

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const folders = await Folder.find({ user: userId });

		res.status(200).json(folders);
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}
};

const getFolderId = async (req, res) => {
	try {
		let folder = await Folder.findOne({ userId: req.user.userId });
		if (!folder) {
			folder = new Folder({ name: "Default Folder", userId: req.user.userId });
			await folder.save();
		}
		res.json({ folderId: folder._id });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error fetching folder ID", error: error.message });
	}
};

module.exports = {
	getFolderId,
	getFoldersByUser,
	deleteFolder,
	updateFolder,
	getFolders,
	createFolder,
};
