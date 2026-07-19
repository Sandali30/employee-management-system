const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
const { validate } = require("../middleware/validationMiddleware");

const {
    applyLeaveValidator
} = require("../validators/leaveValidator");

const {
    applyLeave,
    getMyLeaves,
    getAllLeaves,
    approveLeave,
    rejectLeave
} = require("../controllers/leaveController");

router.post(
    "/apply",
    authenticate,
    applyLeaveValidator,
    validate,
    applyLeave
);

router.get(
    "/my-leaves",
    authenticate,
    getMyLeaves
);

router.get(
    "/",
    authenticate,
    authorize("Super Admin", "HR Manager"),
    getAllLeaves
);

router.put(
    "/:id/approve",
    authenticate,
    authorize("Super Admin", "HR Manager"),
    approveLeave
);

router.put(
    "/:id/reject",
    authenticate,
    authorize("Super Admin", "HR Manager"),
    rejectLeave
);

module.exports = router;