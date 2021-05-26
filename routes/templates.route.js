const express = require("express");
const router = express.Router();
const auth = require("../middleware/authEditor");
const {
  addTemplate,
  updateTemplate,
  getTemplate,
  deleteTemplate,
  approveTemplate,
  getApproveTemplatesList,
} = require("../controllers/temlate.controller");

//@route  get api/Templates
//@desc   get templates
//@access Public
router.get("/", getTemplate);
//@route  POST api/Templates
//@desc   Add Template
//@access Public
router.post("/", auth, addTemplate);
//@route  PUT api/Templates
//@desc   Update Templates
//@access Public
router.put("/", auth, updateTemplate);
//@route  PUT api/Templates
//@desc   Update Templates
//@access Public
router.delete("/:id", auth, deleteTemplate);
//@route  PUT api/Templates
//@desc   approve Templates
//@access Public
router.put("/approve/:id", auth, approveTemplate);
//@route  get api/Templates/approved
//@desc   get approved templates
//@access Public
router.get("/approved", getApproveTemplatesList);

module.exports = router;
