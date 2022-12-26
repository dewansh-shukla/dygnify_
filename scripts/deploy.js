const hre = require("hardhat")

async function main() {
  const DygnifyFactory = await hre.ethers.getContractFactory("Dygnify")
  const DygnifyContract = await DygnifyFactory.deploy()

  await DygnifyContract.deployed()

  console.log(` deployed to ${DygnifyContract.address}`)
}
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
