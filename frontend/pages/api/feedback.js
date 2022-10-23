const { Client, LogLevel } = require('@notionhq/client');
const { NOTION_API_TOKEN, NOTION_DATABASE_ID } = process.env;

async function addFeedback(feedback) {
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
    },
  });
}

export default async function handler(req, res) {
  const { body } = req;
  await addFeedback(body.feedback)
  res.status(200).end();
}
