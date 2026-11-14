/**
 * Google Apps Script for the Xtarc community waitlist sheet.
 *
 * Setup (once):
 * 1. Create a Google Sheet. Extensions → Apps Script. Replace the code with this file.
 * 2. Optional, for extra safety: Project Settings → Script properties → add SECRET
 *    with a long random value, and set the same value as WAITLIST_SHEET_SECRET in Vercel.
 * 3. Deploy → New deployment → type "Web app". Execute as: Me. Who has access: Anyone.
 * 4. Copy the web app URL. In Vercel, add WAITLIST_SHEET_URL (that URL), then
 *    redeploy. Keep the URL private: only the server uses it.
 *
 * The site posts { secret, email, name?, source? }. A new email adds a row; the
 * same email again updates that row (used when the member adds their name).
 */
const HEADERS = ["Joined", "Email", "Name", "Source"];

function doPost(e) {
  const out = (body) => ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
  try {
    const data = JSON.parse(e.postData.contents);
    const secret = PropertiesService.getScriptProperties().getProperty("SECRET");
    // The URL itself is private (server-side only); SECRET adds a second check when set.
    if (secret && data.secret !== secret) return out({ ok: false, error: "unauthorized" });
    const email = String(data.email || "").trim().toLowerCase();
    if (!email) return out({ ok: false, error: "no email" });

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
      if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
      const emails = sheet.getRange(2, 2, Math.max(sheet.getLastRow() - 1, 1), 1).getValues().map((r) => String(r[0]).toLowerCase());
      const at = emails.indexOf(email);
      if (at === -1) {
        sheet.appendRow([new Date(), email, data.name || "", data.source || ""]);
      } else if (data.name) {
        sheet.getRange(at + 2, 3).setValue(data.name);
      }
    } finally {
      lock.releaseLock();
    }
    return out({ ok: true });
  } catch (err) {
    return out({ ok: false, error: String(err) });
  }
}
