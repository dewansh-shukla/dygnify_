import { useState } from "react"
import { getContract } from "../../utils/helpers"
import ContractAbi from "../../Constants/Dygnify.json"
import { ethers } from "ethers"

const CreateInvoiceModal = () => {
  const [buyerPan, setBuyerPan] = useState<string>("")
  const [sellerPan, setSellerPan] = useState<string>("")
  const [invoiceAmount, setInvoiceAmount] = useState<number>(0)
  const [invoiceDate, setInvoiceDate] = useState<Date>(new Date())

  const createInvoice = async () => {
    try {
      const contract: any = await getContract(
        process.env.REACT_APP_CONTRACT_ADDRESS as string,
        ContractAbi.abi
      )
      await contract.createInvoice(
        ethers.utils.formatBytes32String(buyerPan),
        ethers.utils.formatBytes32String(sellerPan),
        invoiceAmount,
        invoiceDate.toString()
      )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <input type='checkbox' id='CreateInvoice' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box relative'>
          <label
            htmlFor='CreateInvoice'
            className='btn btn-sm btn-circle absolute right-2 top-2'
          >
            ✕
          </label>
          <div className='w-full flex flex-col items-center p-4'>
            <p className='w-full text-xl'>Enter Your Invoice Details !!!</p>
            <div className='flex flex-wrap space-y-2 mt-2'>
              <input
                type='text'
                placeholder='Enter Buyer Pan'
                className='input input-bordered w-full'
                onChange={(e) => setBuyerPan(e.target.value)}
              />
              <input
                type='text'
                placeholder='Enter Seller Pan'
                className='input input-bordered w-full'
                onChange={(e) => setSellerPan(e.target.value)}
              />
              <input
                type='number'
                placeholder='Invoice Amount'
                className='input input-bordered w-full '
                onChange={(e) => setInvoiceAmount(Number(e.target.value))}
              />
              <input
                type='date'
                placeholder='Type here'
                className='input input-bordered w-full'
                onChange={(e) => setInvoiceDate(new Date(e.target.value))}
              />
            </div>
            <div className='w-full flex justify-center mt-4'>
              <button className='btn w-1/2' onClick={createInvoice}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default CreateInvoiceModal
