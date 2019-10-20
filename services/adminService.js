'use strict';

const adminModel = require('../models/admin/admin');

/**
 * @class AdminService
 */
class AdminService {
     /**
     * 
     * @param {String} email 
     * @param {String} uid 
     * @returns {Promise}
     */
    adminLogin(email, uid) {
        return new Promise((resolve, reject) => {
            adminModel.getAdminWithUid(uid)
                .then((adminData) => {
                    if(adminData && adminData.email === email) {
                        // Admin exists
                        return adminData.admin_id;
                    } else {
                        // Admin does not exist, deny
                        let err = new Error('Admin login failed because admin does not exist');
                        reject(err);
                    }
                })
                .then((adminID) => {
                    resolve(adminID);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

const adminServiceObj = new AdminService();

module.exports.adminServiceObj = adminServiceObj;
