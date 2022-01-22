import { model, connection, Schema } from 'mongoose'

const schema = new Schema({
    customer: {
        type: String,
        required: true,
        maxlength: 60
    },
    address: {
        type: String,
        required: true,
        maxlength: 200
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        default: 0
    },
    method: {
        type: Number,
        required: true
    }
},
    { timestamps: true }
)

const modelName = 'Orders';

export default (connection && connection.models[modelName]) ?
    connection.models[modelName]
:
    model(modelName, schema)
;