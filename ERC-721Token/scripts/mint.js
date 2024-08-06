const hre = require("hardhat");
const { encryptDataField } = require("@swisstronik/utils");

const sendShieldedTransaction = async (signer, destination, data, value) => {
  const rpcLink = hre.network.config.url;

  const [encryptedData] = await encryptDataField(rpcLink, data);

  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  const contractAddress = "0x8F6103947436040ce4fcd31354fe18Db8291B6A9"; 
  const recipientAddress = "0x8962a2cb5F91c13530807F082ADA91307A89c4D5"; 

  const [signer] = await hre.ethers.getSigners();

  const contractFactory = await hre.ethers.getContractFactory("NFTSwiss");
  const contract = contractFactory.attach(contractAddress);

  const functionName = "mint";
  const functionArgs = [recipientAddress]; 
  const txData = contract.interface.encodeFunctionData(functionName, functionArgs);

  try {
    console.log("Wait a second");

    const mintTx = await sendShieldedTransaction(
      signer,
      contractAddress,
      txData,
      0
    );

    await mintTx.wait();

    console.log("Completed!");
    console.log("Receipt: ", mintTx);
  } catch (error) {
    console.error("Uncompleted: ", error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});