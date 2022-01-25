// interact.js

// from .env
const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// contract ABI
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json");

// create instance of contract using provider / signer / contract
const alchemyProvider = new ethers.providers.AlchemyProvider(network="rinkeby", API_KEY);
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);
const helloWorldContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

// read init message
async function main(){
	const message = await helloWorldContract.message();
	console.log("The message is: " + message);
	
	console.log("Updating message...");
	const tx = await helloWorldContract.update("This is the new message");
	await tx.wait();
	
	const newMessage = await helloWorldContract.message();
	console.log("New message: " + newMessage);
}




main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
