'use strict';

const {check} = require('express-validator');
const {CURRENCY} = require('./constant');

module.exports = {
    signupValidation: [check('email').isEmail(), check('name').not().isEmpty()],
    loginValidation: [check('email').isEmail()],
    paymentValidation: [
      check('customer_id').isInt(),
      check('client_id').isInt(),
      check('amount').isFloat(),
      check('ref_no').isInt(),
      check('currency').isIn(CURRENCY)
    ],
    adminValidation: [
      check('admin_id').isInt()
    ],
    adminTransValidation: [
      check('admin_id').isInt(),
      check('client_id').isInt()
    ]
  };