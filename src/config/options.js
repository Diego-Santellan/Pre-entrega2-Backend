import dotenv from "dotenv";
dotenv.config();

const options = {
    server:{
        port:process.env.PORT
    },
    mongoDB:{
        url:process.env.MONGO_DB
    }
};
export default {options};
