const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Orcid contract", function () {
  it("Should update both directions in bidirectional mapping", async function() {
    const [owner, addr] = await ethers.getSigners();

    const Orcid = await ethers.getContractFactory("Orcid");
    const orcid = await Orcid.deploy();

    const orcid_ = "0000-0000-0000-0000";
    const address_ = addr.address;

    await orcid.issue(address_, orcid_);
    expect(await orcid.addressToOrcid(address_)).to.equal(orcid_);
    expect(await orcid.orcidToAddress(orcid_)).to.equal(address_);

  });

  it("Should reject transactions from unauthorized parties", async function() {
    // TODO
    expect(false).to.equal(true);
  })
})
