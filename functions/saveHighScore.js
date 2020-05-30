const { table, getHighScores } = require('./utils/airtable');
const { getAccessToken, validateAccessToken } = require('./utils/auth');

exports.handler = async event => {
  const token = getAccessToken(event.headers);
  const user = await validateAccessToken(token);

  if (!user) {
    return {
      statusCode: 401,
      body: JSON.stringify({ err: 'Not authorized.' }),
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ err: 'That method is not allowed' }),
    };
  }

  const { score } = JSON.parse(event.body);
  const name = user['https://typinggame/username'];

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
