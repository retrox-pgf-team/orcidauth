import { ethers } from 'ethers';

const network = "maticmum";
const provider = new ethers.providers.AlchemyProvider(network, process.env.ALCHEMY_API_KEY);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const orcidAbi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_address", "type": "address" }, { "indexed": true, "internalType": "string", "name": "_orcid", "type": "string" }], "name": "AddOrcid", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "addressToOrcid", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_address", "type": "address" }, { "internalType": "string", "name": "_orcid", "type": "string" }], "name": "issue", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "", "type": "string" }], "name": "orcidToAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }]
const orcidContract = new ethers.Contract(process.env.ORCID_CONTRACT, orcidAbi, provider);
const orcidWithSigner = orcidContract.connect(signer);

async function Issue(req, res) {

  // check for erroneous request format
  if (req.method !== 'POST') {
    return res.status(500).send({ error: "wrong request method" });
  }

  console.log("pass method")

  // extract content from request
  const body = req.body;
  const { address, orcid, signature } = body;

  // check for correct data in address and orcid

  // operate on address and orcid
  console.log(`address: ${address}`);
  console.log(`orcid: ${orcid}`);
  console.log(`signature: ${signature}`)

  const signed_address = ethers.utils.verifyMessage(orcid, signature);
  if (signed_address !== address) {
    return res.status(500).send({ error: "signature does not match wallet address" });
  }

  const tx = await orcidWithSigner.issue(address, orcid);
  console.log(tx);

  // respond with status
  res.status(200).send({
    message: "Transaction success"
  });
}

export default Issue;