// Loop throuhg dictionaries and extrat values as list

let dictTolistItems = (arr) => {
  /**
   * Provide the list of values that you want to be returned as list items to be added on pdf
   */
  let listStr = "";
  for (const [key, val] of Object.entries(arr)) {
    listStr += `<li> ${key}: ${val}</li>`;
  }

  return listStr;
};

let createContent = () => {
  // const PDF_folder = DriveApp.getFolderById("118QT0sXXisEdLWBbD4rVdY0fRv97Xsrl");
  // const TEMP_FOLDER = DriveApp.getFolderById("1_t2JDg54MZvGH0yFpj9uQ4jeFf7cyls3");
  // const PDF_Template = DriveApp.getFileById("1qHOMwuq2X_5LhUCfPLWcpUSh2n7pVRvHZ_kE-hsGmwg");
  let [
    uniqCountries,
    genderCount,
    jobCount,
    ideCount,
    experienceCount,
    programmingLangCount,
  ] = analyzeSecondSheetData();

  let countries = dictTolistItems(uniqCountries);
  let gender = dictTolistItems(genderCount);
  let job = dictTolistItems(jobCount);
  let ide = dictTolistItems(ideCount);
  let experience = dictTolistItems(experienceCount);
  let programming = dictTolistItems(programmingLangCount);

  // const fileName = "Survey Report"
  let content = `
  <br>
  <strong>Participants Info: </strong><br>
<br>
  <p>
  <strong>Number of Participants By Countries </strong>: <ul> ${countries} </ul> 
  </p>
  <p>
  <strong>Gender Of Participants</strong>:  <ul> ${gender} </ul> 
  </p>
  <p>
  <strong>Job Roles Of Participants</strong>:  <ul> ${job} </ul> 
  </p>
  <p>
  <strong>Number of Preferred IDEs </strong>: <ul> ${ide} </ul> 
  </p>
  <p>
  <strong>Years of Experiences</strong>:  <ul> ${experience} </ul> 
  </p>
  <p>
  <strong>Programming Languages Used</strong>:  <ul> ${programming} </ul> 
  </p>
  
  `;

  return content;
};

let sendEmail = () => {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let s1 = ss.getSheetByName("Original Responses");

  let lastRow = s1.getLastRow();
  let lastColumn = s1.getLastColumn();
  // let dataRange = s1.getRangeList([`B2:B${lastRow}`, `J2:J${lastRow}`]);

  let dataRange = s1.getRange(2, 2, lastRow - 1, lastColumn - 1).getValues();

  const subject = "Survey Stats";

  dataRange.forEach((data) => {
    let recipentName = data[1];
    let content = createContent();
    let email = data[0];
    let body = `Dear ${recipentName},
    <br><br>
    
    <p> 
    We would like to thank you for your participation on the survey.
  <br>
    We've sent you participation results up until now as following:
  <br><br>
    ${content}

  <br><br>
     Sincierely, 
     <br>
     Code Eaters

     </p>
     
    `;
    // loop around each value check if the email is replied or not
    if (data[data.length - 1] === "")
      MailApp.sendEmail({ to: email, subject: subject, htmlBody: body });
  });
};
