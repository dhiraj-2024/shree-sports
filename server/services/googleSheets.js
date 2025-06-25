const { google } = require("googleapis");
const path = require("path");
require("dotenv").config();

try {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const appendToSheet = async (spreadsheetId, range, values) => {
    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: "RAW",
        resource: { values: [values] },
      });
      console.log("✅ Data appended to Google Sheet");
    } catch (err) {
      console.error("Google Sheets Error:", err.message);
    }
  };

  module.exports = { appendToSheet };
} catch (err) {
  console.error("Failed to initialize Google Sheets:", err.message);
  process.exit(1);
}
