import { ethers } from 'ethers';
import jwt_decode from 'jwt-decode';
import getOrcidInfo from '../../utils/getOrcidInfo';


const { orcidWithSigner } = getOrcidInfo();

async function Issue(req, res) {

  let errorMsg = "error processing request";

  try {

    // check for erroneous request format
    if (req.method !== 'POST') {
      return res.status(500).send({ error: "wrong request method" });
    }

    console.log("pass method")

    // extract content from request
    const body = req.body;
    const { address, orcidJWT, signature } = body;
    const orcidDec = jwt_decode(orcidJWT);
    const orcid = orcidDec.sub;

    // check for correct data in address and orcid

    // operate on address and orcid
    console.log(`address: ${address}`);
    console.log(`orcid JWT: ${orcidJWT}`);
    console.log(`JWT decoded: ${JSON.stringify(orcidDec, null, 2)}`);
    console.log(`orcid: ${orcid}`);
    console.log(`signature: ${signature}`);

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

  } catch (error) {
    res.status(500).send({ error: errorMsg });
  }
}

export default Issue;