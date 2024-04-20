////////////// COMMON FUNCTION AND UTILS //////////////

// get random integer
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// get bridge leaderboard from google sheet
function getLeaderboard() {
  var ssId = "17DpPcpdz1t-XjwHSjPjEI7V_p8A893YsYFhv1diYIco"
  var sheet = SpreadsheetApp.openById(ssId).getSheetByName("Bridge Leaderboard");
  var range = sheet.getRange(4, 1, NUM_PEOPLE, 5);
  var values = range.getValues();

  return values
}

// util to get correct spacing for formatting leaderboard
function getSpaces(value) {
  var num = 0;
  switch (value){
    case "Suki":
      num = 10;
      break;
    case "Rachel":
      num = 6;
      break;
    case "Rheanne":
      num = 2;
      break;
    case "Zane":
      num = 9;
      break;
    case "Iain":
      num = 11;
      break;
    case "Oscar":
      num = 7;
      break;
    case "Shuang":
      num = 3;
      break;
    case "CY":
      num = 13;
      break;
    case "Natalie":
      num = 5;
      break;
    case "JessieJ":
      num = 5;
      break;
    default:
    num = 1;
  }
  return " ".repeat(num);
}

function getTotalFish(name) {
  // get total fish
  var ssId = "17DpPcpdz1t-XjwHSjPjEI7V_p8A893YsYFhv1diYIco"
  var fishSheet = SpreadsheetApp.openById(ssId).getSheetByName("Fishing Inventory");
  var lastRow = fishSheet.getLastRow();
  var range = fishSheet.getRange("A1:A" + lastRow); // Assuming the "name" value is in column A
  
  // Get the cell with the value "name"
  var targetCell = range.createTextFinder(name).findNext();

  var targetRow = targetCell.getRow();
  var targetColumn = targetCell.getColumn();
  
  var sumRange = fishSheet.getRange(targetRow, targetColumn + 1, 1, 3); // Gets the range of three cells to the right of the target cell
  var sumValues = sumRange.getValues()[0]; // Get values from the range
  
  var sum = sumValues.reduce(function(acc, currentValue) {
    return acc + currentValue;
  }, 0);

  return sum;
}

// delete triggers
function deleteTriggers() {
  
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (   triggers[i].getHandlerFunction() == "message") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}

// create trigger for daily leaderboard update
function createTimeDrivenTriggers() {

  deleteTriggers();

  // Trigger every day at 9am.   
  ScriptApp.newTrigger('message')
      .timeBased()
      .atHour(8)
      .everyDays(1)
      .inTimezone("Asia/Singapore")
      .create(); 

  // ScriptApp.newTrigger('message')
  //     .timeBased()
  //     .everyMinutes(1)
  //     .create(); 
}

// common send message function for bot
function sendMessage(id, text)
{
  
  var data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(id),
      text: text,
      parse_mode: "MarkdownV2"
    }
  };
  
  var response = UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data);
}