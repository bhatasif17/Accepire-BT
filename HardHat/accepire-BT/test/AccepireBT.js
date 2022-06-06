//const accepireBT = artifacts.require('AccepireBT');

const { expect } = require("chai");
const { ethers } = require("hardhat");
//0xdf33a1132fC93A97ebe6C2EE91cdd92f5AF28868
//var Web3 = require('web3');
let instance;
let applicant;
let beneficiary;
let orderId ;
let issuingBank;
let correspondingBank;
let shippingCompany;
let inspectionCompany;
let applicantCountryCustoms;
let beneficiaryCountryCustoms;
let documentId; //LC id from IPFS

before('Deploy Contract', async () => {
    let accounts = await ethers.getSigners();
    // for (const account of accounts) {
    //     console.log(account.address);
    //   }

    applicant = accounts[0];
    beneficiary = accounts[1];
    issuingBank = accounts[2];
    correspondingBank = accounts[3];
    shippingCompany =accounts[4];
    inspectionCompany = accounts[5];
    applicantCountryCustoms = accounts[6];
    beneficiaryCountryCustoms = accounts[7];
    documentId =  ethers.utils.hexZeroPad("0x000", 32);
    orderId = ethers.utils.hexZeroPad("0xabbb5caa7dda850e60932de0934eb1f9d0f59695050f761dc64e443e5030a569",32)
    const AccepireBT = await ethers.getContractFactory("AccepireBT");
   //deploy new instance
    instance = await AccepireBT.deploy();
    // instance = await AccepireBT.attach(
    //     "0x1E3EDaAA750BCCdaE35F35f6da69C9A1Ad703924" // The deployed contract address
    //   );
     console.log("Accepire-BT deployed to:", instance.address);
});

 describe("AccepireBT", function () {
    it("Applicant sets the Sales Agreement", async function() {
        try {
           const r = await instance.setSalesAgreement(beneficiary.address, orderId);
            await r.wait();
        } catch (err) {
            console.log( "SALES AGG");
            console.log( err);
        }
    });
    
    it("Applicant adds the order", async function () {
        try {
            let quantity = await ethers.utils.hexlify(ethers.utils.toUtf8Bytes("50"));
            const paddedQuantity = ethers.utils.hexZeroPad(quantity, 8);
            const r = await instance.connect(applicant).addOrder(orderId, paddedQuantity, "TV", "SONY LED");
             await r.wait();
        }
        catch (err) {
            console.log("Applicant ADDS ORDER: " + err);
        }
    });

    it("Beneficiary creates an Invoice", async function () {
        try {
            let r = await instance.connect(beneficiary).createInvoice(orderId, 1000, 10, 5);
            await r.wait();
        } catch (err) {
            console.log(err);
        }
    });

    it("Buyer confirms the invoice", async function () {
        try {
            const r = await instance.connect(applicant).confirmInvoice(orderId);
            await r.wait();
        } catch (err) {
            console.log("BUYER CONFIRMS THE ORDER" + err);
        }
    });

    it("Beneficiary creates the Order", async function () {
        try {
            const r = await instance.connect(beneficiary).confirmOrder(orderId);
            await r.wait();
        } catch (err) {
            console.log("Beneficiary CREATES THE ORDER" + err);
        }
    });

    it("View Invoices", async function () {
        const r = await instance.viewInvoices(orderId)
    });

    it("View Dealers", async function () {
        await instance.viewDealers(orderId);
    });

    it("Order Exists?", async function () {
       await instance.checkOrder(orderId);
    });

    it("Orders", async function () {
         await instance.viewOrders(orderId);
    });

    it("Cancel Confirmed Order", async function () {
       await  expect( instance.cancelOrder(orderId))
            .to.be.revertedWith('You are not permitted to do the required action.');
    });

    it("Cancel Not Confirmed Order", async function () {
        try {
            await instance.connect(beneficiary).cancelOrder(orderId);
        }
        catch {
           // console.log("Cannot cancel the confirmed order.");
        }
    });
    
    // //FINNACIAL CONTRACT FUNCTIONS
    it("Applicant sets the Financial Agreement", async function () {
        const r = await instance.connect(applicant).setFinancialAgreementParties(orderId, issuingBank.address);
        await r.wait();
    });

    it("Issuing Bank confirms the agreement", async function () {
        const r = await instance.connect(issuingBank).confirmFinancialAgreement(orderId);
        await r.wait();
    });

    // //Letter of Credit
    it("Issuing Bank sets the LC Agreement", async function () {
        const r = await instance.connect(issuingBank).setLCAgreement(beneficiary.address, correspondingBank.address, orderId);
        await r.wait();
    });

    it("Add Document", async function () {
        const r = await instance.connect(issuingBank).addDocument(orderId, documentId);
        await r.wait();
    });

    it("Get number of documents upoaded", async function () {
        await instance.getNumberOfDocuments(orderId);
    });

    it("Get DocumentID", async function () {
        const r = await instance.connect(correspondingBank).getDocumentID(orderId);
        
    });

    it("Check if document is valid", async function () {
        await instance.IsDocumentValid(documentId);
    });

    it("Validate Document", async function () {
        const r = await instance.connect(correspondingBank).validateDocument(orderId, documentId);
        await r.wait();
    });

 //SHIPMENT
        it("Set Shipment Parties", async function () {
            try {
                const r = await instance.connect(beneficiary)
                    .setShippingAgreement(orderId, applicant.address,
                        beneficiaryCountryCustoms.address,
                        applicantCountryCustoms.address,
                        inspectionCompany.address,
                        shippingCompany.address
                    );
                    //{gasPrice: ethers.utils.parseUnits('10', 'gwei'),gasLimit: 400000}
                await r.wait();
                
            }
            catch (err) {
                console.log(err);
            }
        });

    it("Inspection Company Verify Goods ", async function () {
        const r = await instance.connect(inspectionCompany).verifyGoods(orderId);
        await r.wait();
    });

    it("Beneficiary Country Customs Verify Goods ", async function () {
        const r = await instance.connect(beneficiaryCountryCustoms).verifyGoods(orderId);
        await r.wait();   
});

    it("Initiate Shipment", async function () {
        try { 
            const r = await instance.connect(shippingCompany)
                .initiateShipment(orderId);
                //.initiateShipment(orderId, {gasPrice: ethers.utils.parseUnits('10', 'gwei'), gasLimit: 400000});
            await r.wait(); 
        }
        catch (err) {
            console.log(err);
        }
  
    });

    it("Applicant Country Customs Verify Goods ", async function () {
        const r = await instance.connect(applicantCountryCustoms)
        //.verifyGoods(orderId, {gasPrice: ethers.utils.parseUnits('1', 'gwei'), gasLimit: 400000});
        .verifyGoods(orderId);
        await r.wait();
    });

    it("Confirm Shipment", async function () {
        const r = await instance.connect(applicant)
            //.confirmShipment(orderId, { gasPrice: ethers.utils.parseUnits('10', 'gwei'), gasLimit: 400000 });
            .confirmShipment(orderId);
        await r.wait();
    });

    // //PAYMENT
    it("Set Payment Parties", async function () {
        const r = await instance.connect(issuingBank).setPaymentAgreement(orderId, correspondingBank.address, beneficiary.address, applicant.address);
        await r.wait();
    });

    it("Initiate Payment by issuing bank", async function () {
        const r = await instance.connect(issuingBank).initiatePayment(orderId);
        await r.wait();  
});

    it("Process Payment by Corresponding bank", async function () {
        const r = await instance.connect(correspondingBank).processpayment(orderId);
       await r.wait();   
});

    it("Payment Received by Seller", async function () {
        const r = await instance.connect(beneficiary).paymentReceived(orderId);
        await r.wait();
    });
    
});