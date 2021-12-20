import { ethers, providers} from "ethers";
import { getProvider } from "./getProvider";
import NFTItem from "../artifacts/contracts/NFTee.sol/NFTItem.json";

const run = async () => {
    const contractAddress = process.env.CONTRACT_ADDRESS;
    const provider = getProvider();
    const [,, ...unsanitizedArgs] = process.argv;

    if (unsanitizedArgs.length != 1) {
        console.log("yarn es ./src/mintNFT <tokenuri>");
        return;
    }

    const wallet = new ethers.Wallet(process.env.ADDRESS, provider);

    const NFTItemContact = new ethers.Contract(
        contractAddress,
        NFTItem.abi,
        wallet
    );

    const [tokenUri] = unsanitizedArgs;

    console.log("minting");
    const transaction = await NFTItemContact.create(wallet.address, tokenUri);
    const tx = await transaction.wait();
    const event =  tx.events[0];
    const value = event.args[2];
    const tokenId = value.toNumber();

    console.log({
        transaction,
        tx,
        tokenId
    });
};

(
    async () => {
        try {
            await run();
        } catch(err) {
            console.log("err: ", err);
            process.exit(1);
        }
        process.exit(0);
    })();