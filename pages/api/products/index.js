import mongoConnect from "../../../utils/mongo"
import Product from "../../../models/Product"

export default async function handler(req, res) {
    const { method, cookies } = req

    const token = cookies.token

    mongoConnect();

    if (method === "GET") {
        try {
            if (token) {
                let query = {};
                let page = req.query.page;
                if (!page || page.typeof == "undefined") {
                    page = 1
                }
                let limit = 3;
                let skip = limit * (page - 1);

                const products = await Product.find().skip(skip).limit(limit)
                const total = await Product.find()
                res.status(200).json({ products, totalPages: total.length })
            } else {
                const products = await Product.find()
                res.status(200).json(products)
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }

    if (method === "POST") {
        if (!token || token !== process.env.token) {
            return res.status(401).json("Não autenticado!")
        }
        try {
            const product = await Product.create(req.body)
            res.status(201).json(product)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}