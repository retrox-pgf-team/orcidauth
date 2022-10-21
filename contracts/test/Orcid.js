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

    const [owner, addr] = await ethers.getSigners();

    const Orcid = await ethers.getContractFactory("Orcid");
    const orcid = await Orcid.deploy();

    const x = orcid.connect(addr);
    expect(x.issue(addr.address, "0000")).to.be.revertedWith("only owner can update orcids");
    expect(x.clear(addr.address)).to.be.revertedWith("only authorized parties can delete orcids");

  });

  it("Should delete a registered orcid", async function() {

    const [owner, addr] = await ethers.getSigners();

    const Orcid = await ethers.getContractFactory("Orcid");
    const orcid = await Orcid.deploy();

    const orcid_ = "0000-0000-0000-0000";
    const address_ = addr.address;

    await orcid.issue(address_, orcid_);
    expect(await orcid.addressToOrcid(address_)).to.equal(orcid_);
    expect(await orcid.orcidToAddress(orcid_)).to.equal(address_);

    await orcid.clear(address_);
    expect(await orcid.addressToOrcid(address_)).to.equal("");
    expect(await orcid.orcidToAddress(orcid_)).to.equal("0x0000000000000000000000000000000000000000");

  })
})
