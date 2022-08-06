/**
 * This app script fetches survey responses
 * Manipultes, visualizes and creates a template with Data Studio
 * Send the template to the survey participants after submission of survey
 */
//Developer Survey Responses Sheet
const FORM_ID = "1Q6BOXO9TqnojaPf9OXxt5iJouIIWF8_HYCdD5d2-1Tg";
// form url
//https://docs.google.com/forms/d/1Q6BOXO9TqnojaPf9OXxt5iJouIIWF8_HYCdD5d2-1Tg/edit

let getFormItems1 = () => {
  const form = FormApp.openById(FORM_ID);
  const formItems = form.getItems();
  formItems.forEach((item) => console.log([item.getTitle(), item.getId()]));
};

/**
 *[ 'Name', 737249345 ]
  [ 'Country', 1556586440 ]
  [ 'Gender', 832247290 ]
  [ 'Please select the role that is closest to yours',  1905857766 ]
  [ 'What is your most preferred IDE?', 1828757249 ]
  [ 'How many years have you been coding?', 1883008474 ]
  [ 'Check the boxes for you favorite programming languages.',  1699902553 ]
*/

/**
 * [ 'Country',
    'Gender',
    'Please select the role that is closest to yours',
    'What is your most preferred IDE?',
    'How many years have you been coding?',
    'Check the boxes for you favorite programming languages.' ]
 */

let fillSecondSheet = () => {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let surveyResponseSheet = ss.getSheetByName("Original Responses");
  let processedResponseSheet = ss.getSheetByName("Processed Responses");

  let lastRow = surveyResponseSheet.getLastRow();

  let range = surveyResponseSheet.getRange(`D2:I${lastRow}`);
  //console.log(range.getValues())

  let values = surveyResponseSheet.getRange(2, 4, lastRow - 1, 6).getValues();

  console.log(values);

  processedResponseSheet.getRange(2, 1, values.length, 6).setValues(values);
};

let countUnique = (arr) => {
  return arr.reduce((initObj, currVal) => {
    initObj[currVal] =
      initObj[currVal] === undefined ? 1 : (initObj[currVal] += 1);
    return initObj;
  }, {});
};

let analyzeSecondSheetData = () => {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let processedResponseSheet = ss.getSheetByName("Processed Responses");

  let lastRow = processedResponseSheet.getLastRow();

  let countryCol = processedResponseSheet
    .getRange(2, 1, lastRow - 1, 1)
    .getValues()
    .flat();
  let uniqCountries = countUnique(countryCol);

  let genderCol = processedResponseSheet
    .getRange(2, 2, lastRow - 1, 1)
    .getValues()
    .flat();
  let genderCount = countUnique(genderCol);

  let jobCol = processedResponseSheet
    .getRange(2, 3, lastRow - 1, 1)
    .getValues()
    .flat();
  let jobCount = countUnique(jobCol);

  let ideCol = processedResponseSheet
    .getRange(2, 4, lastRow - 1, 1)
    .getValues()
    .flat();
  let ideCount = countUnique(ideCol);

  let experienceCol = processedResponseSheet
    .getRange(2, 5, lastRow - 1, 1)
    .getValues()
    .flat();
  let experienceCount = countUnique(experienceCol);

  // Need to do some coding to extract all the programming languages as unique
  let programmingLangColInit = processedResponseSheet
    .getRange(2, 6, lastRow - 1, 1)
    .getValues()
    .flat()
    .map((item) => (item.indexOf(",") == -1 ? item : item.split(",")))
    .flat();

  // Formatting the string to trim, uppercase first and lowercase the rest
  programmingLangCol = programmingLangColInit.map(
    (item) =>
      item.trim().charAt(0).toUpperCase() + item.trim().slice(1).toLowerCase()
  );

  let programmingLangCount = countUnique(programmingLangCol);
  //console.log(programmingLangCount)

  console.log([
    uniqCountries,
    genderCount,
    jobCount,
    ideCount,
    experienceCount,
    programmingLangCount,
  ]);
  return [
    uniqCountries,
    genderCount,
    jobCount,
    ideCount,
    experienceCount,
    programmingLangCount,
  ];
};
