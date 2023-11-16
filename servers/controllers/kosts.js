const { Kost, User, UserProfile } = require('../models/index')

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
			const { name, address, description } = req.body
			const kost = await Kost.create({
				name,
				address,
				description,
				ownerId: req.user.id
			})

			res.status(201).json(kost)
		} catch (error) {
			next(error)
		}
	}

	static async editMyKost(req, res, next) {
		try {
			const { id } = req.params
			const { name, address, description } = req.body
			const kost = await Kost.update({
				name,
				address,
				description
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
}

module.exports = Kosts