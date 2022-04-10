import { connect } from 'mongoose';
const MONGODB_URI = process.env.MONGODB_URI;

export default async () => {
    try {

        // console.log("Conectando ao MongoDB...");
        await connect(MONGODB_URI);
        // console.log("MongoDB conectado com sucesso");

    } catch(error) {
        console.log("Erro na conexão com o mongo db:", error);
    }
}