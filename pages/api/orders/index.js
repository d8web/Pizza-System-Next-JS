import mongoConnect from '../../../utils/mongo';
import Order from '../../../models/Order';

const handler = async (req, res) => {
    
    const { method } = req
    mongoConnect();

    switch(method) {
        case "GET":
            try {
                const orders = await Order.find()
                res.status(200).json(orders)
            } catch (err) {
                // res.status(500).json(err)
            }
        break;
        case "POST":
            try {
                const order = await Order.create(req.body)
                res.status(201).json(order)
            } catch (err) {
                // res.status(500).json(err)
            }
        break;
    }
}

export default handler;