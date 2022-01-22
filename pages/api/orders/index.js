import mongoConnect from '../../../utils/mongo'
import Order from '../../../models/Order'

const handler = async (req, res) => {

    const { method } = req

    mongoConnect()

    if (method === "GET") {
        try {
            let query = {};
            let page = req.query.page;
            if (!page || page.typeof == "undefined") {
                page = 1
            }
            let limit = 5;
            let skip = limit * (page - 1);

            const orders = await Order.find().skip(skip).limit(limit)
            const total = await Order.find()
            res.status(200).json({ orders, totalPages: total.length })
        } catch (err) {
            res.status(500).json(err)
        }
    }

    if (method === "POST") {

        try {

            const order = await Order.create(req.body)
            res.status(201).json(order)

        } catch (err) {
            res.status(500).json(err)
        }

    }

}

export default handler