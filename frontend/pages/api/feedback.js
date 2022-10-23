const { Client, LogLevel } = require('@notionhq/client');
const { NOTION_API_TOKEN, NOTION_DATABASE_ID } = process.env;

async function addFeedback(feedback, orcid = "", address = "") {
  const notion = new Client({
    auth: NOTION_API_TOKEN,
    logLevel: LogLevel.DEBUG,
  });

  await notion.pages.create({
    parent: {
      database_id: NOTION_DATABASE_ID,
    },
    properties: {
      Feedback: {
        rich_text: [
          {
            text: {
              content: feedback,
            },
          },
        ],
      },
      ORCID: {
        rich_text: [
          {
            text: {
              content: orcid,
            },
          },
        ],
      },
      Address: {
        rich_text: [
          {
            text: {
              content: address,
            },
          },
        ],
      },
    },
  });
}

export default async function handler(req, res) {
  const { body } = req;
  await addFeedback(body.feedback, body.orcid, body.address);
  res.status(200).end();
}
