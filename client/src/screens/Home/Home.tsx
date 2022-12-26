import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import react, { useEffect } from "react"
import CreateInvoiceModal from "../../components/Modals/CreateInvoice"
import { getContract } from "../../utils/helpers"
import ContractAbi from "../../Constants/Dygnify.json"
import Invoice from "../../components/Invoice/Invoice"
import { ethers } from "ethers"
const Home = () => {
  const { address, isConnected } = useAccount()
  const [allInvoices, setAllInvoices] = react.useState<any>([])
  const [activeTab, setActiveTab] = react.useState<string>("All Invoices")
  const [refresh, setRefresh] = react.useState<boolean>(false)
  const [buyerPAN, setBuyerPAN] = react.useState<string>("")
  const [buyerInvoices, setBuyerInvoices] = react.useState<any>([])

  const fetchBuyerVideos = async () => {
    try {
      const contract: any = await getContract(
        process.env.REACT_APP_CONTRACT_ADDRESS as string,
        ContractAbi.abi
      )

      const buyerinvoices = await contract.getInvoicesByBuyerPAN(
        ethers.utils.formatBytes32String(buyerPAN)
      )
      console.log("invoices buyers", buyerinvoices)
      setBuyerInvoices(buyerinvoices)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchInvoices = async () => {
    try {
      const contract: any = await getContract(
        process.env.REACT_APP_CONTRACT_ADDRESS as string,
        ContractAbi.abi
      )
      const allInvoices = await contract.getAllInvoices()
      console.log(allInvoices)
      setAllInvoices(allInvoices)
    } catch (error) {
      console.log(error)
      alert("Error Fetching Invoices")
    }
  }
  useEffect(() => {
    fetchInvoices()
  }, [])
  useEffect(() => {
    fetchInvoices()
  }, [refresh])

  return (
    <>
      <div className='flex flex-col w-full  items-center h-full'>
        <h1 className='text-3xl mb-4 mt-10'>Dygnify_Task</h1>
        <ConnectButton chainStatus='icon' showBalance={false} />
        {isConnected ? (
          <>
            {/* Wrpper div */}
            <div className='w-full flex flex-col'>
              {/* Navbar */}
              <div className='w-full flex mt-4 justify-center'>
                <div className='w-1/4  flex justify-center'>
                  <label htmlFor='CreateInvoice' className='btn'>
                    Create Invoice
                  </label>
                </div>
              </div>
              {/* Invoice Listing */}
              <div className='w-full flex flex-col mt-4 items-center'>
                <div className='tabs tabs-boxed mb-2'>
                  <a
                    className={`tab ${
                      activeTab === "All Invoices" ? "tab-active" : ""
                    }`}
                    onClick={() => setActiveTab("All Invoices")}
                  >
                    All Invoices
                  </a>
                  <a
                    className={`tab ${
                      activeTab === "Buyers Invoice" ? "tab-active" : ""
                    }`}
                    onClick={() => setActiveTab("Buyers Invoice")}
                  >
                    Buyers Invoice
                  </a>
                </div>
                {/* Invoice Listing */}
                {activeTab === "All Invoices" ? (
                  <>
                    <div className='w-1/2 flex flex-col items-center'>
                      <button
                        className='btn w-1/3'
                        onClick={() => setRefresh(!refresh)}
                      >
                        click to refresh feed
                      </button>
                      {allInvoices?.length !== 0 ? (
                        allInvoices.map((invoice: any, index: number) => {
                          return <Invoice invoice={invoice} key={index} />
                        })
                      ) : (
                        <p>No Invoices</p>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className='w-1/2 flex flex-col items-center'>
                      <div className='flex w-full flex-col items-center'>
                        <p className='m-2'>Enter Buyers Pan</p>
                        <input
                          type='text'
                          className='input input-bordered w-1/2 m-2'
                          value={buyerPAN}
                          onChange={(e) => setBuyerPAN(e.target.value)}
                        />
                        <button className='btn m-2' onClick={fetchBuyerVideos}>
                          Fetch Invoices
                        </button>
                      </div>
                      {buyerInvoices?.length !== 0 ? (
                        buyerInvoices?.map((invoice: any, index: number) => {
                          return <Invoice invoice={invoice} key={index} />
                        })
                      ) : (
                        <p>No Invoices for this buyer</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <p className=''>not connected</p>
          </>
        )}
        <CreateInvoiceModal />
      </div>
    </>
  )
}

export default Home
