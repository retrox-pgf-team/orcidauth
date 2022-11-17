// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Orcid {

  mapping(address => string) public addressToOrcid;
  mapping(string => address) public orcidToAddress;

  event AddOrcid(address _address, string _orcid);
  event DeleteOrcid(address _address);

  address _owner;

  constructor() {
    _owner = msg.sender;
  }

  function issue(address _address, string calldata _orcid) external {

    // reject transactions that aren't from approved party
    require(msg.sender == _owner, "only owner can update orcids");

    // operate on data
    addressToOrcid[_address] = _orcid;
    orcidToAddress[_orcid] = _address;

    // Notify off-chain infrastructure
    emit AddOrcid(_address, _orcid);

  }

  function clear(address _address) external {

    // reject transactions that aren't approved
    require(msg.sender == _owner || msg.sender == _address, "only authorized parties can delete orcids");
     
    string memory orcid = addressToOrcid[_address];
    orcidToAddress[orcid] = address(0);
    addressToOrcid[_address] = "";

    // Notify off-chain infrastructure
    emit DeleteOrcid(_address);

  }

}
