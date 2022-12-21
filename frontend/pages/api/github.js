var convert = require("xml-js");

export default async function handler(req, res) {
  const { git_id } = req.query;
  const github = await fetch("https://github.com/" + git_id + ".atom").then(
    function (response) {
      return response.text();
    }
  );
  const githubJson = JSON.parse(
    convert.xml2json(github, { compact: true, spaces: 1 })
  );
  res.status(200).json(githubJson.feed);
}
