'use strict';

const {DEDUCTION_FEE, TRANSACTION_STATUS} = require('../helpers/constant');
const transactionModel = require('../models/transaction/transaction');

/**
 * @class TransactionService
 */
class TransactionService {
    /**
     * 
     * @param {Object} requestData
     * @returns {Promise}
     */
    addTransaction(requestData) {
        return new Promise((resolve, reject) => {
            let transactionData = {
                customer_id: requestData.customer_id,
                client_id: requestData.client_id,
                amount: requestData.amount,
                currency: requestData.currency,
                ref_no: requestData.ref_no,
                transaction_date: new Date(),
                transaction_status: TRANSACTION_STATUS.SUCCESS
            };
            transactionData.sub_total = transactionData.amount;
            if(requestData.hasOwnProperty('vat_rate')) {
                // sub_total = Deduct vat amount from given amount
                transactionData.vat =
                Number((requestData.vat_rate * requestData.amount).toFixed(2));
                transactionData.sub_total =
                Number((transactionData.sub_total - transactionData.vat).toFixed(2));
            }
            if(requestData.hasOwnProperty('service_tax_rate')) {
                // sub_total = Deduct service tax amount from given amount
                transactionData.service_tax =
                Number((requestData.service_tax_rate * requestData.amount).toFixed(2));
                transactionData.sub_total =
                Number((transactionData.sub_total - transactionData.service_tax).toFixed(2));
            }
            // Calculate deduction fee on sub_total
            let deductionFee = Number((transactionData.sub_total * DEDUCTION_FEE).toFixed(2));
            transactionData.deduction = deductionFee;
            // Final amount = sub_total - deduction_fee
            transactionData.final_amount = Number((transactionData.sub_total - deductionFee).toFixed(2));

            transactionModel.addTransaction(transactionData)
                .then((transactionID) => {
                    transactionData.transaction_id = transactionID;
                    resolve(transactionData);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    /**
     * 
     * @param {Number} clientID
     * @returns {Promise}
     */
    viewTransaction(clientID) {
        return new Promise((resolve, reject) => {
            transactionModel.viewTransaction(clientID)
                .then((transactions) => {
                    resolve(transactions);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

const transactionServiceObj = new TransactionService();

module.exports.transactionServiceObj = transactionServiceObj;