import { FC } from "react"
import { ethers } from "ethers"
interface Props {
  invoice: any
}
const Invoice: FC<Props> = ({ invoice }) => {
  console.log("--", invoice)
  return (
    <>
      <div className='min-h-[200px] bg-slate-700 text-white rounded-3xl flex flex-col p-2 m-4'>
        <p className='m-2'>
          Buyers Pan :{ethers.utils.parseBytes32String(invoice.buyerPAN)}
        </p>
        <p className='m-2'>
          Sellers Pan :{ethers.utils.parseBytes32String(invoice.sellerPAN)}
        </p>
        <p className='m-2'>Invoice Creation Date:{invoice.invoiceDate}</p>
        <p className='m-2'>
          status : {invoice.paid ? "Already Paid" : "Not Paid yet"}
        </p>
        {invoice.paid ? (
          <></>
        ) : (
          <div className='w-full flex justify-center'>
            <button className='btn w-1/2 outlined-primary'>Make Payment</button>
          </div>
        )}
      </div>
    </>
  )
}
export default Invoice
