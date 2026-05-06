/**
 * GOOGLE APPS SCRIPT CODE FOR GOOGLE SHEETS
 * 
 * 1. Open your Google Sheet.
 * 2. Go to Extensions > App Script.
 * 3. Delete existing code and paste this.
 * 4. Save and click "Deploy" > "New Deployment".
 * 5. Select type "Web App".
 * 6. Set "Execute As" to "Me" and "Who has access" to "Anyone".
 * 7. Deploy and copy the "Web App URL" to your .env file as VITE_GAS_URL.
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheets()[0]; // Use the first sheet
    
    // Check if headers exist
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", 
        "LINE ID", 
        "Display Name", 
        "Name", 
        "Age", 
        "Gender", 
        "Weight", 
        "Height", 
        "Disease", 
        "Address",
        "Raw Data"
      ]);
    }
    
    // Append the user data
    sheet.appendRow([
      new Date(),
      data.lineId || "",
      data.displayName || "",
      data.name || "",
      data.age || "",
      data.gender || "",
      data.weight || "",
      data.height || "",
      data.disease || "",
      data.address || "",
      JSON.stringify(data)
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// OPTIONAL: Simple GET for testing
function doGet() {
  return ContentService.createTextOutput("Elderly Link API is running.");
}
