'use strict';

const clientModel = require('../models/client/client');

/**
 * @class ClientService
 */
class ClientService {
    /**
     * 
     * @returns {Promise}
     */
    getClients() {
        return new Promise((resolve, reject) => {
            clientModel.getClients()
                .then((clientList) => {
                    resolve(clientList);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

const clientServiceObj = new ClientService();

module.exports.clientServiceObj = clientServiceObj;