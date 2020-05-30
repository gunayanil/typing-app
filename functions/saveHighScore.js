const { table, getHighScores } = require('./utils/airtable');
const { getAccessToken } = require('./utils/auth');

exports.handler = async event => {
  const token = getAccessToken(event.headers);

  if (!token) {
    return {
      statusCode: 401,
      body: JSON.stringify({ err: 'Not authorizated.' }),
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ err: 'That method is not allowed' }),
    };
  }

  const { score, name } = JSON.parse(event.body);

  if (!typeof score === 'undefined' || !name) {
    return {
      statusCode: 400,
      body: JSON.stringify({ err: 'Bad request' }),
    };
  }

  try {
    const records = await getHighScores(false);
    const lowestRecord = records[9];

    if (
      lowestRecord.fields.score === undefined ||
      score > lowestRecord.fields.score
    ) {
      const updatedRecord = { id: lowestRecord.id, fields: { name, score } };
      await table.update([updatedRecord]);

      return {
        statusCode: 200,
        body: JSON.stringify(updatedRecord),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({}),
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        err: 'Failed to save score in Airtable',
      }),
    };
  }
};
