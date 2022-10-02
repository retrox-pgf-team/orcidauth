async function Issue(req, res) {

  // check for erroneous request format

  // extract content from request
  const body = req.body;
  const { address, orcid } = body;

  // operate on address and orcid
  console.log(`address: ${address}`);
  console.log(`orcid: ${orcid}`);

  // respond with status
  res.send({
    message: "All good"
  });
}

export default Issue;