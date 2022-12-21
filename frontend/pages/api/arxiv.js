var convert = require("xml-js");

export default async function handler(req, res) {
  const { id } = req.query;
  console.log(id);
  const arxiv = await fetch("https://arxiv.org/a/" + id + ".atom").then(
    function (response) {
      return response.text();
    }
  );
  const arxivJson = JSON.parse(
    convert.xml2json(arxiv, { compact: true, spaces: 1 })
  );
  res.status(200).json(arxivJson.feed);
}
