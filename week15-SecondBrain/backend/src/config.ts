import dotenv from 'dotenv';

dotenv.config();

interface EnvVariables {
    MONGO_URL: string;
    SECRET_KEY: string;
}

const env: EnvVariables = {
    MONGO_URL: process.env.MONGO_URL as string,
    SECRET_KEY: process.env.SECRET_KEY as string,
};

export default env;