const { network } = require("hardhat");

const {
  developmentChains,
  networkConfig,
} = require("../helper-hardhat-config");
const { storeImages } = require("../utils/uploadToPinata");

const { verify } = require("../utils/verify");

const imagesLocation = "./images/randomNft"

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments;
  const { deployer } = getNamedAccounts();
  const chainId = network.config.chainId;
  let tokenUris


  // get the IPFS hashes of our images
if(process.env.UPLOAD_TO_PINATA == "true") {
    tokenUris = await handleTokenUris()


}

  // 1. with our own IPFS node https://docs.ipfs.io/
  // 2. Pinata https://www.pinata.cloud/
  // 3. NTF.storage https://nft.storage/

  let vrfCoordinatorV2Address, subscriptionId;

  if (developmentChains.includes(network.name)) {
    const vrfCoordinatorV2Mock = await ethers.getContract(
      "VRFCoordinatorV2Mock"
    );
    vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address;
    const tx = await vrfCoordinatorV2Mock.createSubscription();
    const txReceipt = await tx.wait(1);

    subscriptionId = txReceipt.events[0].args.subId;
  } else {
    vrfCoordinatorV2Address = networkConfig[chainId].vrfCoordinatorV2;
    subscriptionId = networkConfig[chainId].subscriptionId;
  }

  log("-----------------------------------------");

  await  storeImages(imagesLocation)
//   const args = [
//     vrfcoordinatorV2Address,
//     subscriptionId,
//     networkConfig[chainId].gasLane,
//     networkConfig[chainId].callbackGasLimit,
//     //tokenUris
//     networkConfig[chainId].mintFee,
//   ];
};


async function handleTokenUris() {
    tokenUris = []

    // store the image in IPFS
    // store the metadata in IPFS

    return tokenUris
}

module.exports.tags = ["all", "randomipfs", main]