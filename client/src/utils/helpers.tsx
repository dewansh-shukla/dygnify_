import { ethers } from "ethers"
const getContract = (address: string, abi: any) => {
  try {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum as any)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(address, abi, signer)
    return contract
  } catch (error) {
    console.log(error)
  }
}

export { getContract }
