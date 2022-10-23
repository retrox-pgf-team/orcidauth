import { ethers } from 'ethers';
import getOrcidInfo from '../../utils/getOrcidInfo';

const { orcidWithSigner } = getOrcidInfo();

async function Clear(req, res) {

  let errorMsg = "error processing request";

  try {

    // check for erroneous request format
    if (req.method !== 'POST') {
      return res.status(500).send({ error: "wrong request method" });
    }

    console.log("pass method")

    // extract content from request
    const body = req.body;
    const { address, signature } = body;

    // operate on address
    console.log(`address: ${address}`);
    console.log(`signature: ${signature}`)

    const signed_address = ethers.utils.verifyMessage(address, signature);
    if (signed_address !== address) {
      return res.status(500).send({ error: "signature does not match wallet address" });
    }

    const tx = await orcidWithSigner.clear(address);
    console.log(tx);

    // Success
    res.status(200).send({
      message: "Transaction success"
    });

  } catch (error) {
    res.status(500).send({ error: errorMsg });
  }
}

export default Clear;