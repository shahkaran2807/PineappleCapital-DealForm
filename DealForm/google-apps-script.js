// Google Apps Script — Lender Questionnaire → Google Sheets
//
// Setup:
//   1. Create a Google Sheet
//   2. Go to Extensions > Apps Script
//   3. Paste this entire file into the script editor
//   4. Click Deploy > New deployment
//      - Type: Web app
//      - Execute as: Me
//      - Who has access: Anyone
//   5. Copy the web app URL and set it as VITE_GOOGLE_SCRIPT_URL in your frontend .env

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Add header row if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Bank / Institution',
        'Full Name',
        'Email',
        'Phone',
        'Title / Role',
        'Bank HQ Location',
        'Loan Products',
        'Property Types',
        'Regions',
        'Specific States',
        'Min Loan Size',
        'Max Loan Size',
        'Max LTV',
        'Min DSCR',
        'Min FICO',
        'Rate Range',
        'Amortization',
        'Typical Loan Term',
        'Prepayment Structure',
        'Recourse Options',
        'Deal Types',
        'Notify on Deals',
        'Additional Notes'
      ]);
    }

    sheet.appendRow([
      new Date(),
      data.bank_name || '',
      data.full_name || '',
      data.email || '',
      data.phone || '',
      data.title_role || '',
      data.bank_hq_location || '',
      (data.loan_products || []).join(', '),
      (data.property_types || []).join(', '),
      (data.regions || []).join(', '),
      data.specific_states || '',
      data.min_loan_size || '',
      data.max_loan_size || '',
      data.max_ltv || '',
      data.min_dscr || '',
      data.min_fico || '',
      data.rate_range || '',
      data.amortization || '',
      data.typical_loan_term || '',
      data.prepayment_structure || '',
      (data.recourse_options || []).join(', '),
      (data.deal_types || []).join(', '),
      data.notify_deals ? 'Yes' : 'No',
      data.additional_notes || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
