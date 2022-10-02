// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Orcid {

  mapping(address => string) public addressToOrcid;
  mapping(string => address) public orcidToAddress;

  event AddOrcid(address indexed _address, string indexed _orcid);

  function issue(address _address, string calldata _orcid) external {

    // reject transactions that aren't from approved party

    // operate on data
    addressToOrcid[_address] = _orcid;
    orcidToAddress[_orcid] = _address;

    // Notify off-chain infrastructure
    emit AddOrcid(_address, _orcid);

  }

}
