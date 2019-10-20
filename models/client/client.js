'use strict';

const {CLIENT_TABLE} = require('../../helpers/constant');
const connection = require('../connection').connection;

/**
 * @class ClientModel
 */
class ClientModel {
    /**
     *
     * @returns {Promise}
     */
    getClients() {
        return new Promise((resolve, reject) => {
            let query = `select * from ${CLIENT_TABLE}`;
            connection.query(query, function (error, results) {
                if(error) {
                    reject(error);
                } else {
                   resolve(results);
                }
            });
        });
    }
}

let clientModelObj = new ClientModel();

module.exports = clientModelObj;