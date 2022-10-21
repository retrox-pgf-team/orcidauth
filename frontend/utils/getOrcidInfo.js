import { ethers } from 'ethers';

function getOrcidInfo() {
  const network = "maticmum";
  const provider = new ethers.providers.AlchemyProvider(network, process.env.ALCHEMY_API_KEY);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const orcidAbi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_address", "type": "address" }, { "indexed": true, "internalType": "string", "name": "_orcid", "type": "string" }], "name": "AddOrcid", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "addressToOrcid", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_address", "type": "address" }, { "internalType": "string", "name": "_orcid", "type": "string" }], "name": "issue", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "", "type": "string" }], "name": "orcidToAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }]
  const orcidContract = new ethers.Contract(process.env.ORCID_CONTRACT, orcidAbi, provider);
  const orcidWithSigner = orcidContract.connect(signer);

  return {
    network,
    provider,
    signer,
    orcidAbi,
    orcidContract,
    orcidWithSigner
  }
}

export default getOrcidInfo;
