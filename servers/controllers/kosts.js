const { Kost, User, UserProfile, Transaction } = require('../models/index')
const { getDatabase, ref, set } = require("firebase/database");

class Kosts {
  static async getKosts(_, res, next) {
		try {
			const kosts = await Kost.findAll({
				order: [
					["id"]
				]
			})

			res.status(200).json(kosts)
		} catch (error) {
			next(error)
		}
	}

	static async createMyKost(req, res, next) {
		try {
			const { name, address, description, slot, price } = req.body
			const kost = await Kost.create({
				name,
				address,
				description,
				ownerId: req.user.id,
				slot,
				price
			})

			res.status(201).json(kost)
		} catch (error) {
			next(error)
		}
	}

	static async editMyKost(req, res, next) {
		try {
			const { id } = req.params
			const { name, address, description, slot, price } = req.body
			const kost = await Kost.update({
				name,
				address,
				description,
				slot,
				price
			}, {
				where: {
					id
				}
			})
			if(kost[0] === 0) throw { name: "InvalidParams" }
			
			res.status(200).json({ message: "Successfully update kost." })
		} catch (error) {
			next(error)
		}
	}

	static async deleteMyKost(req, res, next) {
		try {
			const { id } = req.params
			await Transaction.destroy({
				where: {
					kostId: id
				}
			})

			await Kost.destroy({
				where: {
					id
				}
			})

			res.status(200).json({ message: "Successfully deleted kost." })
		} catch (error) {
			next(error)
		}
	}

	static async getMyKosts(req, res, next) {
		try {
			const kosts = await Kost.findAll({
				where: {
					ownerId: req.user.id
				},
				order: [
					["id"]
				]
			})

			res.status(200).json(kosts)
		} catch (error) {
			next(error)
		}
	}

	static async getKost(req, res, next) {
		try {
			const { id } = req.params
			if(!Number(id)) throw { name: "InvalidParams" }

			const kost = await Kost.findByPk(Number(id), {
				include: {
					model: User,
					as: 'owner',
					include: {
						model: UserProfile,
						as: 'profiles'
					}
				}
			})
			if(!kost) throw { name: "NotFound" }

			res.status(200).json({ ...kost.dataValues, owner: kost.owner.profiles })
		} catch (error) {
			next(error)
		}
	}

	static async updateStatusKost(req, res, next) {
		try {
			const database = getDatabase()
			const { id } = req.params
			if(!Number(id)) throw { name: "InvalidParams" }

			const kost = await Kost.findByPk(Number(id))
			if(!kost) throw { name: "NotFound" }

			await Kost.update({ 
				status: req.body.status === "off" ? "on" : "off"
			}, {
				where: {
					id
				}
			})

			const led = req.body.status === "off" ? 0 : 1

			res.status(200).json({ message: "Successfully updated status kost." })
			set(ref(database, `led${kost.slot}`), led)
		} catch (error) {
			next(error)
		}
	}
}

module.exports = Kosts