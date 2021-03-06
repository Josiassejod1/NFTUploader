import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

export const getProvider = () => {
    const provider = new ethers.providers.InfuraProvider(
        "rinkeby"
    );

    return provider;
};