const hre = require("hardhat");

async function main() {
  const contract = await hre.ethers.deployContract("Testnet2");

  await contract.waitForDeployment();

  console.log(`Testnet2 contract deployed to ${contract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
