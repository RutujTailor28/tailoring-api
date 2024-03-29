const express = require('express');
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controller/users');

const User = require('../Models/user');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../Middleware/advancedResults');
const { protect, authorize } = require('../Middleware/auth.js');

router.use(protect);
router.use(authorize('admin'));

router
    .route('/')
    .get(advancedResults(User), getUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;