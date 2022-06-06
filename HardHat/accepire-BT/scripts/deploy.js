async function main() {
  const [deployer] = await ethers.getSigners();
   console.log(
      "Deploying contracts with the account:",
      deployer.address
   );
  
   console.log("Account balance:", (await deployer.getBalance())
      .toString()
   );
  
    const AccepireBT = await ethers.getContractFactory("AccepireBT");
    const accepireBT = await AccepireBT.deploy();
  
    console.log("Accepire-BT deployed to:", accepireBT.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });