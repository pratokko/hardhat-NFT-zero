const { network } = require("hardhat");

const { developmentChains} = require("../helper-hardhat-config")

const BASE_FEE = ethers.utils.parseEther("0.25") //0.25 is the premium
const GAS_PRICE_LINK = 1e9 // 1000000000 // calculated valuebased on the gas price of the chain


//chainlink nodes pay the gas to give us randomness and do external execution

module.exports = async function ( {getNamedAccounts, deployments}) {

    const { deploy, log } = deployments;
    
    const { deployer } = await getNamedAccounts();
    
    const args  = [BASE_FEE, GAS_PRICE_LINK]
    
    
    if ( developmentChains.includes(network.name)) {
    
    
        log(" local network has been detected now we are Deploying mocks ...")
    
        //deploy a mock vrfcoordinator...

        await deploy("VRFCoordinatorV2Mock", {
            from : deployer,
            log: true,
            args: args
        })
    log("Mocks deployed!")

    log("--------------------------------------------------------------")
    
    }

}
module.exports.tags =["all", "randomipfs", "main"]
