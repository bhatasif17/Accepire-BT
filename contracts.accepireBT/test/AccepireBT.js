const accepireBT = artifacts.require('AccepireBT');
const EmbarkJS = artifacts.require('EmbarkJS');
var Web3 = require('web3');
let instance;
let applicant;
let beneficiary;
let salt = 12132;
let orderId = "";
let issuingBank;
let correspondingBank;
let shippingCompany;
let inspectionCompany;
let applicantCountryCustoms;
let beneficiaryCountryCustoms;
let documentId; //LC id from IPFS
  

before('Deploy Contract', async function () {
    
    // EmbarkJS.onReady((error) => {
    //     EmbarkJS.Messages.setProvider("whisper");
    //     if (error) {
    //       console.error('Error while connecting to web3', error);
    //       return;
    //     }});
    const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
    let abi = accepireBT.abiDefinition;
    // let abi = [{ "anonymous": false, "inputs": [{ "components": [{ "internalType": "uint256", "name": "unitPrice", "type": "uint256" }, { "internalType": "uint256", "name": "totalCost", "type": "uint256" }, { "internalType": "uint256", "name": "discount", "type": "uint256" }, { "internalType": "uint256", "name": "CostAfterDiscount", "type": "uint256" }, { "internalType": "bool", "name": "isConfirmedByBuyer", "type": "bool" }], "indexed": false, "internalType": "struct AccepireBT.Invoice", "name": "", "type": "tuple" }], "name": "Invoices", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "description", "type": "string" }], "name": "OrderCancelled", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "description", "type": "string" }], "name": "OrderConfirmed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "description", "type": "string" }], "name": "OrderDoesntExist", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "bytes32", "name": "orderId", "type": "bytes32" }, { "indexed": false, "internalType": "address", "name": "buyer", "type": "address" }, { "indexed": false, "internalType": "address", "name": "seller", "type": "address" }], "name": "SetSalesContract", "type": "event" }, { "inputs": [{ "internalType": "bytes32", "name": "_documentID", "type": "bytes32" }], "name": "IsDocumentValid", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_orderID", "type": "bytes32" }, { "internalType": "bytes32", "name": "_documentID", "type": "bytes32" }], "name": "addDocument", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_orderID", "type": "bytes32" }, { "internalType": "bytes8", "name": "_quantity", "type": "bytes8" }, { "internalType": "string", "name": "_item", "type": "string" }, { "internalType": "string", "name": "_description", "type": "string" }], "name": "addOrder", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_orderID", "type": "bytes32" }], "name": "cancelOrder", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_orderID", "type": "bytes32" }], "name": "checkOrder", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_orderID", "type": "bytes32" }], "name": "confirmFinancialAgreement", "outputs": [], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_orderID", "type": "bytes32" }], "name": "confirmInvoice", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_orderID", "type": "bytes32" }], "name": "confirmOrder", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_orderId", "type": "bytes32" }], "name": "confirmShipment", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_orderID", "type": "bytes32" }, { "internalType": "uint256", "name": "_unitPrice", "type": "uint256" }, { "internalType": "uint256", "name": "_discount", "type": "uint256" }, { "internalType": "uint256", "name": "_quantity", "type": "uint256" }], "name": "createInvoice", "outputs": [{ "components": [{ "internalType": "uint256", "name": "unitPrice", "type": "uint256" }, { "internalType": "uint256", "name": "totalCost", "type": "uint256" }, { "internalType": "uint256", "name": "discount", "type": "uint256" }, { "internalType": "uint256", "name": "CostAfterDiscount", "type": "uint256" }, { "internalType": "bool", "name": "isConfirmedByBuyer", "type": "bool" }], "internalType": "struct AccepireBT.Invoice", "name": "", "type": "tuple" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "dealers", "outputs": [{ "internalType": "address", "name": "seller", "type": "address" }, { "internalType": "address", "name": "buyer", "type": "address" }, { "internalType": "bytes32", "name": "orderID", "type": "bytes32" }, { "internalType": "bool", "name": "isDeal", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "financialAgreementParties", "outputs": [{ "internalType": "address", "name": "buyer", "type": "address" }, { "internalType": "address", "name": "issuingBank", "type": "address" }, { "internalType": "bytes32", "name": "orderID", "type": "bytes32" }, { "internalType": "bool", "name": "exists", "type": "bool" }, { "internalType": "bool", "name": "isConfirmedByIssuingBank", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_orderID", "type": "bytes32" }], "name": "getDocumentID", "outputs": [{ "internalType": "bytes32[]", "name": "", "type": "bytes32[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_orderID", "type": "bytes32" }], "name": "getNumberOfDocuments", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_orderId", "type": "bytes32" }], "name": "initiatePayment", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_orderId", "type": "bytes32" }], "name": "initiateShipment", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "invoices", "outputs": [{ "internalType": "uint256", "name": "unitPrice", "type": "uint256" }, { "internalType": "uint256", "name": "totalCost", "type": "uint256" }, { "internalType": "uint256", "name": "discount", "type": "uint256" }, { "internalType": "uint256", "name": "CostAfterDiscount", "type": "uint256" }, { "internalType": "bool", "name": "isConfirmedByBuyer", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "lcParties", "outputs": [{ "internalType": "address", "name": "seller", "type": "address" }, { "internalType": "address", "name": "issuingBank", "type": "address" }, { "internalType": "bytes32", "name": "orderID", "type": "bytes32" }, { "internalType": "address", "name": "correspondingBank", "type": "address" }, { "internalType": "bytes32", "name": "LCID", "type": "bytes32" }, { "internalType": "bool", "name": "exists", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "orders", "outputs": [{ "internalType": "bytes32", "name": "orderID", "type": "bytes32" }, { "internalType": "address", "name": "seller", "type": "address" }, { "internalType": "address", "name": "buyer", "type": "address" }, { "internalType": "string", "name": "item", "type": "string" }, { "internalType": "enum AccepireBT.OrderState", "name": "orderState", "type": "uint8" }, { "internalType": "enum AccepireBT.PaymentState", "name": "paymentState", "type": "uint8" }, { "internalType": "string", "name": "description", "type": "string" }, { "internalType": "bytes32", "name": "quantity", "type": "bytes32" }, { "internalType": "bool", "name": "isVerifiedByInspectionCompany", "type": "bool" }, { "internalType": "bool", "name": "isVerifiedBySellerCountryCustoms", "type": "bool" }, { "internalType": "bool", "name": "isVerifiedByBuyerCountryCustoms", "type": "bool" }, { "internalType": "bool", "name": "isOrder", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "paymentParties", "outputs": [{ "internalType": "bytes32", "name": "orderId", "type": "bytes32" }, { "internalType": "address", "name": "buyer", "type": "address" }, { "internalType": "address", "name": "seller", "type": "address" }, { "internalType": "address", "name": "correspondingBank", "type": "address" }, { "internalType": "bool", "name": "exists", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_orderId", "type": "bytes32" }], "name": "paymentReceived", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_orderId", "type": "bytes32" }], "name": "processpayment", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_orderID", "type": "bytes32" }, { "internalType": "address", "name": "_issuingBank", "type": "address" }], "name": "setFinancialAgreementParties", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }, { "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }, { "internalType": "bool", "name": "", "type": "bool" }, { "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_seller", "type": "address" }, { "internalType": "address", "name": "_correspondingBank", "type": "address" }, { "internalType": "bytes32", "name": "_orderID", "type": "bytes32" }], "name": "setLCAgreement", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_orderId", "type": "bytes32" }, { "internalType": "address", "name": "_correspondingBank", "type": "address" }, { "internalType": "address", "name": "_seller", "type": "address" }, { "internalType": "address", "name": "_buyer", "type": "address" }], "name": "setPaymentAgreement", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_seller", "type": "address" }], "name": "setSalesContract", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }, { "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "stateMutability": "nonpayable", "type": "function" }, {
    //     "inputs": [{ "internalType": "bytes32", "name": "_orderId", "type": "bytes32" }, { "internalType": "address", "name": "_buyer", "type": "address" }, { "internalType": "address", "name": "_sellerCountryCustoms", "type": "address" }, { "internalType": "address", "name": "_buyerCountryCustoms", "type": "address" },
    //     { "internalType": "address", "name": "_inspectionCompany", "type": "address" }, { "internalType": "address", "name": "_shippingCompany", "type": "address" }], "name": "setShippingAgreement", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    // }, { "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "shipmentParties", "outputs": [{ "internalType": "bytes32", "name": "orderId", "type": "bytes32" }, { "internalType": "address", "name": "buyer", "type": "address" }, { "internalType": "address", "name": "seller", "type": "address" }, { "internalType": "address", "name": "sellerCountryCustoms", "type": "address" }, { "internalType": "address", "name": "buyerCountryCustoms", "type": "address" }, { "internalType": "address", "name": "inspectionCompany", "type": "address" }, { "internalType": "address", "name": "shippingCompany", "type": "address" }, { "internalType": "bool", "name": "exists", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_orderID", "type": "bytes32" }, { "internalType": "bytes32", "name": "_documentID", "type": "bytes32" }], "name": "validateDocument", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }, { "internalType": "bytes32", "name": "", "type": "bytes32" }, { "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_orderId", "type": "bytes32" }], "name": "verifyGoods", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_orderID", "type": "bytes32" }], "name": "viewDealers", "outputs": [{ "components": [{ "internalType": "address", "name": "seller", "type": "address" }, { "internalType": "address", "name": "buyer", "type": "address" }, { "internalType": "bytes32", "name": "orderID", "type": "bytes32" }, { "internalType": "bool", "name": "isDeal", "type": "bool" }], "internalType": "struct AccepireBT.dealer", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_orderID", "type": "bytes32" }], "name": "viewInvoices", "outputs": [{ "components": [{ "internalType": "uint256", "name": "unitPrice", "type": "uint256" }, { "internalType": "uint256", "name": "totalCost", "type": "uint256" }, { "internalType": "uint256", "name": "discount", "type": "uint256" }, { "internalType": "uint256", "name": "CostAfterDiscount", "type": "uint256" }, { "internalType": "bool", "name": "isConfirmedByBuyer", "type": "bool" }], "internalType": "struct AccepireBT.Invoice", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_orderID", "type": "bytes32" }], "name": "viewOrders", "outputs": [{ "components": [{ "internalType": "bytes32", "name": "orderID", "type": "bytes32" }, { "internalType": "address", "name": "seller", "type": "address" }, { "internalType": "address", "name": "buyer", "type": "address" }, { "internalType": "string", "name": "item", "type": "string" }, { "internalType": "enum AccepireBT.OrderState", "name": "orderState", "type": "uint8" }, { "internalType": "enum AccepireBT.PaymentState", "name": "paymentState", "type": "uint8" }, { "internalType": "string", "name": "description", "type": "string" }, { "internalType": "bytes32", "name": "quantity", "type": "bytes32" }, { "internalType": "bool", "name": "isVerifiedByInspectionCompany", "type": "bool" }, { "internalType": "bool", "name": "isVerifiedBySellerCountryCustoms", "type": "bool" }, { "internalType": "bool", "name": "isVerifiedByBuyerCountryCustoms", "type": "bool" }, { "internalType": "bool", "name": "isOrder", "type": "bool" }], "internalType": "struct AccepireBT.Order", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }];
    let bytecode = accepireBT.code;
    //let conractAddress = SalesContract.deployedAddress;
    //https://rinkeby.infura.io/v3/0a2f3875dc2b4fb18870a40c8f62f816
    //for private geth node
    //const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
    let accounts = await web3.eth.getAccounts();

    console.log(accounts[0]);
    console.log(accounts[1]);
    
    applicant = accounts[0];
    beneficiary = accounts[1];
    issuingBank = accounts[2];
    correspondingBank = accounts[3];
    shippingCompany =accounts[4];
    inspectionCompany = accounts[5];
    applicantCountryCustoms = accounts[6];
    beneficiaryCountryCustoms = accounts[7];
    documentId = "0x000";
   
    // instance = await new web3.eth.Contract(abi)
    //     .deploy({ data: "0x" + bytecode })
    //     .send({ from: applicant, gas: 7984452 });
   
    //console.log("Instance", instance);

        let contract_address = "0x14C58A36FFe319E260F3332aF8740Ee0a66e3D76"; // the address of your deployed contract
        instance = new web3.eth.Contract(abi, contract_address);
});

contract("AccepireBT", async function () {
   
    it("Applicant sets the Sales Deal", async function () {
        let r = await instance.methods.setSalesContract(beneficiary)
            .send({ from: applicant, gas: 7984452 });
            done();
            expect(r).to.equal('promise resolved'); 
        //orderId = r.events.SetSalesContract.returnValues["orderId"];
        orderId = "0xabbb5caa7dda850e60932de0934eb1f9d0f59695050f761dc64e443e5030a569";
        //console.log(r);
        //console.log("OrderID: ", orderId);
       // console.log("Applicant: ", r.events.SetSalesContract.returnValues["buyer"]);
        //console.log("Beneficiary: ", r.events.SetSalesContract.returnValues["seller"]);
        
        //Whisper
        // EmbarkJS.Messages.sendMessage({
        //     topic: 'SALES CONTRACT SET',
        //     data: orderId
        //   });
    });
    
    it("Applicant adds the order", async function () {
        let units = await web3.utils.toHex(50);
        const r = await instance.methods.addOrder(orderId, units, "TV", "SONY LED")
            .send({ from: applicant, gas: 7984452 });
        
            expect(r).to.equal('promise resolved'); 
            // EmbarkJS.Messages.listenTo({
            //     topic: ['SALES CONTRACT SET']
            // }).subscribe(message,
            //     console.log('received: ' + message)
            // );
        //console.log(result);
    });

    it("Beneficiary creates an Invoice", async function () {
        let r = await instance.methods.createInvoice(orderId, 1000, 10, 5)
            .send({ from: beneficiary, gas: 7984452 });
        console.log(r);
           // console.log("Unit Price: ", r.events.Invoices.returnValues);
           
            //console.log("Total Cost: ", r.events.Invoices.returnValues["totalCost"]);
            //console.log("Discount: ", r.events.Invoices.returnValues["discount"]);
            //console.log("Cost After Discount: ", r.events.Invoices.returnValues["CostAfterDiscount"]);
            //console.log("Confirmed by Buyer: ", r.events.Invoices.returnValues["isConfirmedByBuyer"]);
    });

    it("Buyer confirms the invoice", async function () {
        console.log(await instance.methods.confirmInvoice(orderId).send({ from: applicant, gas: 7984452 }));
    });

    it("Beneficiary confirms the Order", async function () {
        console.log(await instance.methods.confirmOrder(orderId).send({ from: beneficiary, gas: 7984452 }));
    });

    it("View Invoices", async function () {
        console.log(await instance.methods.viewInvoices(orderId).call());
    });

    it("View Dealers", async function () {
        console.log(await instance.methods.viewDealers(orderId).call());
    });

    it("Order Exists?", async function () {
        console.log(await instance.methods.checkOrder(orderId).call());
    });

    it("Orders", async function () {
        console.log(await instance.methods.viewOrders(orderId).call());
    });

    it("Cancel Confirmed Order", async function () {
            //let r = await instance.methods.cancelOrder(orderId).send({ from: seller, gas: 7984452 });
            await assert.reverts(instance.methods.cancelOrder(orderId), {from: beneficiary, gas: 7984452},
            'Returned error: VM Exception while processing transaction: revert You are not permitted to do the required action.');
    });

    it("Cancel Not Confirmed Order", async function () {
        try {
            console.log(await instance.methods.cancelOrder(orderId).send({ from: beneficiary, gas: 7984452 }));
        }
        catch {
            console.log("Cannot cancel the confirmed order.");
        }
    });
    
    //FINNACIAL CONTRACT FUNCTIONS
    it("Applicant sets the Financial Agreement", async function () {
        console.log(await instance.methods.setFinancialAgreementParties(orderId, issuingBank).send({ from: applicant, gas: 7984452 }));
    });

    it("Issuing Bank confirms the agreement", async function () {
        console.log(await instance.methods.confirmFinancialAgreement(orderId).send({ from: issuingBank, gas: 7984452 }));
    });

    //Letter of Credit
    it("Issuing Bank sets the LC Agreement", async function () {
        console.log(await instance.methods.setLCAgreement(beneficiary, correspondingBank, orderId).send({ from: issuingBank, gas: 7984452 }));
    });

    it("Add Document", async function () {
        console.log(await instance.methods.addDocument(orderId, documentId).send({ from: issuingBank, gas: 7984452 }));
    });

    it("Get number of documents upoaded", async function () {
        console.log(await instance.methods.getNumberOfDocuments(orderId).call());
    });

    it("Get DocumentID", async function () {
        console.log(await instance.methods.getDocumentID(orderId).call({ from: correspondingBank}));
    });

    it("Check if document is valid", async function () {
        console.log(await instance.methods.IsDocumentValid(documentId).call());
    });

    it("Validate Document", async function () {
        console.log(await instance.methods.validateDocument(orderId, documentId).send({ from: correspondingBank, gas: 7984452 }));
    });

    //SHIPMENT
    it("Set Shipment Parties", async function () {
        console.log(await instance.methods.setShippingAgreement(orderId, applicant, beneficiaryCountryCustoms, applicantCountryCustoms, inspectionCompany, shippingCompany).send({ from: beneficiary, gas: 7984452 }));
    });

    it("Inspection Company Verify Goods ", async function () {
        console.log(await instance.methods.verifyGoods(orderId).send({ from: inspectionCompany, gas: 7984452 }));
    });

    it("Beneficiary Country Customs Verify Goods ", async function () {
        console.log(await instance.methods.verifyGoods(orderId).send({ from: beneficiaryCountryCustoms, gas: 7984452 }));
    });

    it("Initiate Shipment", async function () {
        console.log(await instance.methods.initiateShipment(orderId).send({ from: shippingCompany, gas: 7984452 }));
    });

    it("Applicant Country Customs Verify Goods ", async function () {
        console.log(await instance.methods.verifyGoods(orderId).send({ from: applicantCountryCustoms, gas: 7984452 }));
    });

    it("Confirm Shipment", async function () {
        console.log(await instance.methods.confirmShipment(orderId).send({ from: applicant,  gas: 7984452 }));
    });

    //PAYMENT
    it("Set Payment Parties", async function () {
        console.log(await instance.methods.setPaymentAgreement(orderId, correspondingBank, beneficiary, applicant).send({ from: issuingBank, gas: 7984452 }));
    });

    it("Initiate Payment by issuing bank", async function () {
        console.log(await instance.methods.initiatePayment(orderId).send({ from: issuingBank, gas: 7984452 }));
    });

    it("Process Payment by Corresponding bank", async function () {
        console.log(await instance.methods.processpayment(orderId).send({ from: correspondingBank, gas: 7984452 }));
    });

    it("Payment Received by Seller", async function () {
        console.log(await instance.methods.paymentReceived(orderId).send({ from: beneficiary, gas: 7984452 }));
    });
    
});