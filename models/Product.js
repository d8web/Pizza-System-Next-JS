import { model, connection, Schema } from 'mongoose'

const schema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 60
    },
    desc: {
        type: String,
        required: true,
        maxlength: 200
    },
    img: {
        type: String,
        required: true
    },
    prices: {
        type: [Number],
        required: true
    },
    extraOption: {
        type: [
            {
                text: { type: String, required: true },
                price: { type: Number, required: true },
            },
        ]
    }
}, {
    timestamps: true
})

const modelName = 'Products';

export default (connection && connection.models[modelName]) ?
    connection.models[modelName]
    :
    model(modelName, schema)
    ;