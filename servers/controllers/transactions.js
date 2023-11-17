require('dotenv').config()
const midtransClient = require('midtrans-client');
const { Transaction, Kost } = require('../models/index');
const { Op } = require('sequelize');
const { getDatabase, ref, set } = require("firebase/database");

class Transactions {
  static async createTransaction(req, res, next) {
    try {
      const { id } = req.params
      if(!Number(id)) throw { name: "InvalidParams" }
      const kost = await Kost.findByPk(id)
      if(!kost) throw { name: "NotFound" }

      const { price, item_name, client_name, client_email, client_phone } = req.body
      const transaction = await Transaction.findAll({
        where: {
          [Op.and]: [
            { kostId: id },
            { clientId: req.user.id },
            { status: "pending" }
          ]
        }
      })
      if(transaction.length > 0) throw { name: "TooManyRequests" }

      let snap = new midtransClient.Snap({
        isProduction : false,
        serverKey : process.env.MIDTRANS_SERVER_KEY
      })

      const order_id = new Date().getTime()
      let parameter = {
        "transaction_details": {
          "order_id": 'T-' + order_id ,
          "gross_amount": price
        },
        "item_details": [
          {
            "price": price,
            "quantity": 1,
            "name": item_name
          }
        ],
        "customer_details": {
          "first_name": client_name,
          "email": client_email,
          "phone": client_phone
        }
      }

      snap.createTransaction(parameter)
        .then(async (transaction) => {
          let transactionToken = transaction.token
          await Transaction.create({
            orderId: 'T-' + order_id,
            clientId: req.user.id,
            kostId: id,
            status: "pending",
            url: transaction.redirect_url
          })

          res.status(200).json(transactionToken)
        })
    } catch (error) {
      // next(error)
    }
  }

  static async updateTransaction(req, res, next) {
    try {
      const database = getDatabase()
      
      const transaction = await Transaction.update({
        status: req.body.transaction_status
      }, {
        where: {
          orderId: req.body.order_id
        },
        returning: true
      })

      if(req.body.transaction_status === "settlement") {
        const kost = await Kost.update({
          status: "on",
        }, {
          where: {
            id: transaction[1][0].dataValues.kostId
          },
          returning: true
        })
        
        set(ref(database, `led${kost[1][0].dataValues.slot}`), 1)
          .then(() => {
            res.sendStatus(200)
          })
      }
    } catch (error) {
      next(error)
    }
  }

  static async getTransactions(req, res, next) {
    try {
      const transactions = await Transaction.findAll({
        where: {
          clientId: req.user.id
        },
        order: [
          ["id", "DESC"]
        ],
        include: {
          model: Kost,
          as: "kosts"
        }
      })

      res.status(200).json(transactions)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Transactions