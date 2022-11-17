import { ethers } from 'ethers';

async function GetIssuances() {

  const provider = new ethers.providers.JsonRpcProvider(
    'https://polygon-mumbai.g.alchemy.com/v2/Lvg6Sp2FS9yUK_PFYFvK2fSY87w3Iftg'
  );
  const abi = ['event AddOrcid(address _address, string _orcid)'];
  const orcid = new ethers.Contract('0x74a58601b3765516196EBF7db47A1959eD886097', abi, provider);
  const eventsFilter = orcid.filters.AddOrcid();
  const eventsRaw = await orcid.queryFilter(eventsFilter);
  const events = eventsRaw.map((event) => [
    event.blockNumber,
    event.transactionHash,
    event.args?._address,
    event.args?._orcid,
  ]);

  return {
    issues: events
  }

}

export default GetIssuances;
