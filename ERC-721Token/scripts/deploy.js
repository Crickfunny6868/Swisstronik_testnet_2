const hre = require("hardhat");

async function main() {
  const contract = await hre.ethers.deployContract("NFTSwiss");

  await contract.waitForDeployment();

  console.log(`NFT contract deployed to ${contract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
