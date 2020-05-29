require('dotenv').config();
const Airtable = require('airtable');

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE);
const table = base.table(process.env.AIRTABLE_TABLE);

const getHighScores = async filterRecords => {
  const records = await table
    .select({
      sort: [{ field: 'score', direction: 'desc' }],
      filterByFormula: `AND(name !== "", score > 0)`,
    })
    .firstPage();

  const formattedRecords = records.map(record => ({
    id: record.id,
    fileds: record.fields,
  }));
  return formattedRecords;
};

module.exports = {
  table,
  getHighScores,
};
