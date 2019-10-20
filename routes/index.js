'use strict';

const express = require('express');
const router = express.Router();

router.use('/auth', require('../controllers/auth/authController').router);
router.use('/customer', require('../controllers/customer/customerController').router);
router.use('/admin', require('../controllers/admin/adminController').router);

module.exports = router;