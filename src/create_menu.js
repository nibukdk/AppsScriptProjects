/**
 *This file is for creating Menu on spread sheet.
 *
 * */

let onOpen = () => {
  let ui = SpreadsheetApp.getUi();

  ui.createMenu("External Helper Menu")
    .addItem("Fill Second Sheet", "fillSecondSheet")
    .addItem("Send Email", "sendEmail")
    .addToUi();
};
