//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract Dygnify {
    struct InvoiceData {
        bytes32 buyerPAN;
        bytes32 sellerPAN;
        uint invoiceAmount;
        string invoiceDate;
        bool paid;
    }
    InvoiceData[] public allInvoices;
    mapping(bytes32 => InvoiceData) public invoices;
    mapping(bytes32 => InvoiceData[]) public buyerInvoices;
    mapping(bytes32 => bytes32[]) public sellerInvoices;

    function generateInvoiceID(
        bytes32 buyerPAN,
        bytes32 sellerPAN,
        uint invoiceAmount,
        string memory invoiceDate
    ) private pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked(
                    buyerPAN,
                    sellerPAN,
                    invoiceAmount,
                    invoiceDate
                )
            );
    }

    function getAllInvoices() public view returns (InvoiceData[] memory) {
        return allInvoices;
    }

    function createInvoice(
        bytes32 buyerPAN,
        bytes32 sellerPAN,
        uint invoiceAmount,
        string memory invoiceDate
    ) public {
        bytes32 invoiceID = generateInvoiceID(
            buyerPAN,
            sellerPAN,
            invoiceAmount,
            invoiceDate
        );
        invoices[invoiceID] = InvoiceData({
            buyerPAN: buyerPAN,
            sellerPAN: sellerPAN,
            invoiceAmount: invoiceAmount,
            invoiceDate: invoiceDate,
            paid: false
        });
        buyerInvoices[buyerPAN].push(invoices[invoiceID]);
        sellerInvoices[sellerPAN].push(invoiceID);
        allInvoices.push(invoices[invoiceID]);
    }

    function updatePaymentStatus(bytes32 invoiceID, bool paid) public {
        invoices[invoiceID].paid = paid;
    }

    function getInvoicesByBuyerPAN(
        bytes32 buyerPAN
    ) public view returns (InvoiceData[] memory) {
        return buyerInvoices[buyerPAN];
    }
}
