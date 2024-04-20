////////////// BOT METHODS //////////////

// add burps method
function addBurps(name, id) {
  var ssId = "17DpPcpdz1t-XjwHSjPjEI7V_p8A893YsYFhv1diYIco"
  var sheet = SpreadsheetApp.openById(ssId).getSheetByName("Burp Counter");
  var lastRow = sheet.getLastRow();
  var range = sheet.getRange("A1:A" + lastRow); // Assuming the "name" value is in column A
  
  // Get the cell with the value "name"
  var targetCell = range.createTextFinder(name).findNext();
  
  if (targetCell !== null) {
    // Get the cell to the right of "name"
    var nextCell = targetCell.offset(0, 1);
    var newValue = nextCell.getValue() + 1;
    
    // Insert the desired value into the cell to the right of "Oscar"
    nextCell.setValue(newValue);

    // Send msg
    var text = "*"+name+"*" + " burped a total of " + "*"+ newValue+"*" + " times\\."

    sendMessage(id, text);

  } else {
    Logger.log("Not found in the specified range.");
    // Send msg
    var text = "Invalid name"

    sendMessage(id, text);
  }
}

// send daily leaderboard
function message()
{
  var lbvalues = getLeaderboard();
  var text = "__*Daily Bridge Leaderboard*\__ \n"
              + "1\\. "+ lbvalues[0][0] + getSpaces(lbvalues[0][0]) + " Win%: " + String((lbvalues[0][4]*100).toFixed(2)).replace(".", "\\.") + " ![👑](tg://emoji?id=5368324170671202286)" + "\n"
  
  for (var i=1; i<NUM_PEOPLE; i++){
    text += (i+1) +"\\. "+ lbvalues[i][0] + getSpaces(lbvalues[i][0]) + " Win%: " + String((lbvalues[i][4]*100).toFixed(2)).replace(".", "\\.") + "\n"
  }

  sendMessage(-1001818536761, text);
}

// send leaderboard
function sendLeaderboard(id)
{
  var lbvalues = getLeaderboard();
  var text = "__*Bridge Leaderboard*\__ \n"
              + "1\\. "+ lbvalues[0][0] + getSpaces(lbvalues[0][0]) + " Win%: " + String((lbvalues[0][4]*100).toFixed(2)).replace(".", "\\.") + " ![👑](tg://emoji?id=5368324170671202286)![👑](tg://emoji?id=5368324170671202286)" + "\n"

  for (var i=1; i<NUM_PEOPLE; i++){
    text += (i+1) +"\\. "+ lbvalues[i][0] + getSpaces(lbvalues[i][0]) + " Win%: " + String((lbvalues[i][4]*100).toFixed(2)).replace(".", "\\.") + "\n"
  }

  sendMessage(id, text);
}


function sendCheer(id) {
  var lbvalues = getLeaderboard();
  var text = "*__"+lbvalues[NUM_PEOPLE-1][0]+"\__*" + " has the lowest winrate at " + String((lbvalues[NUM_PEOPLE-1][4]*100).toFixed(2)).replace(".", "\\.") + "%\\. Try harder\\!![🙌](tg://emoji?id=5368324170671202286)"

  sendMessage(id, text);
}

function sendJood(id) {
  var lbvalues = getLeaderboard();
  var text = "*"+lbvalues[0][0]+"*" + ", " + "*"+lbvalues[1][0]+"*" + " and " + "*"+lbvalues[2][0]+"*" + " have the highest winrate now\\. JOOOOOD\\!"

  sendMessage(id, text);

}

function sendDion(id) {
  var rand = getRandomInt(100);
  var text = "";

  if (rand > 90) {
    text = "Hi rherhe ![❤️](tg://emoji?id=5368324170671202286)"
  } else {
    text = "Hi Rheanne ![🤗](tg://emoji?id=5368324170671202286)"
  }

  sendMessage(id, text)
}

function sendIain(id) {

  var text = "Eat shit ![🤗](tg://emoji?id=5368324170671202286)"

  sendMessage(id, text);
}

function sendZane(id) {
  var text = "![🤮](tg://emoji?id=5368324170671202286)"

  sendMessage(id, text);
}

function coinflip(id){
  var rand = getRandomInt(100);
  var text = "";

  if (rand > 50) {
    text = "_clink_\\.\\.\\. the coin landed on *Heads* ![🪙](tg://emoji?id=5368324170671202286)"
  } else {
    text = "_clink_\\.\\.\\. the coin landed on *Tails* ![🪙](tg://emoji?id=5368324170671202286)"
  }

  sendMessage(id, text);
}

// legacy roll dice function
function diceRoll(id) {
  var rand = getRandomInt(6);
  var text = ""

  if (rand == 0) {
    text = "_rolls_\\.\\.\\. the dice rolled a *1*";
  } else if (rand == 1) {
    text = "_rolls_\\.\\.\\. the dice rolled a *2*";
  } else if (rand == 2) {
    text = "_rolls_\\.\\.\\. the dice rolled a *3*";
  } else if (rand == 3) {
    text = "_rolls_\\.\\.\\. the dice rolled a *4*";
  } else if (rand == 4) {
    text = "_rolls_\\.\\.\\. the dice rolled a *5*";
  } else {
    text = "_rolls_\\.\\.\\. the dice rolled a *6*";
  }

  sendMessage(id, text);
}

function doFish(name, id) {

  const fishMap = {
    fish: {
      index: 1,
      emoji: "🐟"
    },
    shrimp: {
      index: 2,
      emoji: "🦐"
    },
    trash: {
      index: 3,
      emoji: "🩴"
    },
    squid: {
      index: 4,
      emoji: "🦑"
    },
    crab: {
      index: 5,
      emoji: "🦀"
    },
    turtle: {
      index: 6,
      emoji: "🐢"
    }
  }

  const rand = getRandomInt(100);
  let fish = "";

  var ssId = "17DpPcpdz1t-XjwHSjPjEI7V_p8A893YsYFhv1diYIco"
  var sheet = SpreadsheetApp.openById(ssId).getSheetByName("Fishing Inventory");
  var lastRow = sheet.getLastRow();
  var range = sheet.getRange("A1:A" + lastRow); // Assuming the "name" value is in column A
  
  // Get the cell with the value "name"
  var targetCell = range.createTextFinder(name).findNext();

  // check for last fished time
  var timeCell = targetCell.offset(0, 22);

  var date = new Date();
  // if not fished before
  if (timeCell.getValue() == "") {
    timeCell.setValue(date);
  } else {
    
    const cooldown = 10 * 60 * 1000;
    var lastFished = new Date(timeCell.getValue())
    var lastFishedWithCD = new Date(lastFished.getTime() + cooldown);

    // Logger.log(date.getTime() > lastFishedWithCD.getTime())
    if (date < lastFishedWithCD) {
      const timeLeft = Math.floor((lastFishedWithCD - date)/1000)
      const text = "You may fish again in *" + timeLeft + "* seconds"

      return sendMessage(id, text);
    } else {
      timeCell.setValue(date);
    }
  }

  
  // gacha fish
  if (rand == 1) {
    fish = "turtle";
  } else if (rand <= 3) {
    fish = "crab";
  } else if (rand <= 7) {
    fish = "squid";
  } else if (rand <= 35) {
    fish = "trash";
  } else if (rand <= 60) {
    fish = "shrimp";
  } else {
    fish = "fish";
  }

  // Get the cell for fish
  var fishCell = targetCell.offset(0, fishMap[fish].index);
  var newFishCount = fishCell.getValue() + 1;
  fishCell.setValue(newFishCount);

  if (fish == "trash") {
    var text = "![🎣](tg://emoji?id=5368324170671202286) _reels_\\.\\.\\. You found " + "*"+fish+"*" + fishMap[fish].emoji + "\\!";
  } else {
    var text = "![🎣](tg://emoji?id=5368324170671202286) _reels_\\.\\.\\. You caught a " + "*"+fish+"*" + fishMap[fish].emoji + "\\!";
  }
  
  sendMessage(id, text);

}

function showInventory(name, id) {
  var ssId = "17DpPcpdz1t-XjwHSjPjEI7V_p8A893YsYFhv1diYIco"
  var sheet = SpreadsheetApp.openById(ssId).getSheetByName("Fishing Inventory");
  var lastRow = sheet.getLastRow();
  var range = sheet.getRange("A1:A" + lastRow); // Assuming the "name" value is in column A
  
  // Get the cell with the value "name"
  var targetCell = range.createTextFinder(name).findNext();
  
  // Get the cell for fish
  var fishCell = targetCell.offset(0, 1);
  
  var text = "__*"+name+"*'s Fishes__ \n"
              + "x"+targetCell.offset(0, 1).getValue() + " 🐟\n"
              + "x"+targetCell.offset(0, 2).getValue() + " 🦐\n"
              + "x"+targetCell.offset(0, 3).getValue() + " 🩴\n"
              + "x"+targetCell.offset(0, 4).getValue() + " 🦑\n"
              + "x"+targetCell.offset(0, 5).getValue() + " 🦀\n"
              + "x"+targetCell.offset(0, 6).getValue() + " 🐢\n"

  sendMessage(id, text);
}

function sendBurp(id) {
  const file_id = "AwACAgUAAxkBAAP6ZiB8L2exqMNrur0NhBrmByJNci8AAnoPAAIRS_BUYxWlniODf_Y0BA"

  var data = {
    method: "post",
    payload: {
      method: "sendVoice",
      chat_id: String(id),
      voice: file_id
    }
  };
  
  var response = UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data);
}

function sendDice(id) {
  var data = {
    method: "post",
    payload: {
      method: "sendDice",
      chat_id: String(id)
    }
  };
  
  var response = UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data);
}

function shootHoops(name, id) {
  const rand = getRandomInt(100);
  let text = ""

  var ssId = "17DpPcpdz1t-XjwHSjPjEI7V_p8A893YsYFhv1diYIco"
  var bridgeSheet = SpreadsheetApp.openById(ssId).getSheetByName("Hoops Stats");
  var lastRow = bridgeSheet.getLastRow();
  var range = bridgeSheet.getRange("A1:A" + lastRow); // Assuming the "name" value is in column A

  // Get the cell with the value "name"
  var targetCell = range.createTextFinder(name).findNext();

  // Get the cell for total games
  var nextCell = targetCell.offset(0, 1);
  var newValue = nextCell.getValue() + 1;
    
  // Insert the desired value into the cell to the right of name
  nextCell.setValue(newValue);

  if (rand <= 10) {
    text = "_swoosh_ \\.\\.\\. What a *3\\-pointer*\\! 🏀"

    // Get the cell for total games
    var nextCell2 = targetCell.offset(0, 2);
    var newValue2 = nextCell2.getValue() + 1;
      
    // Insert the desired value into the cell to the right of name
    nextCell2.setValue(newValue2);
  } else {
    text = "⛹️ \\.\\.\\. that's an *air ball*\\. lol 💨"
  }

  sendMessage(id, text);
}

function sendYouWait(id){
  const file_id = "DQACAgUAAx0CbGSrOQACIUJmIk4iRYe74JUPC2xF0b5gVkkbzQADEQAC-ffAVJtkj2vrEJaTNAQ"

  var data = {
    method: "post",
    payload: {
      method: "sendVideoNote",
      chat_id: String(id),
      video_note: file_id
    }
  };
  
  var response = UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data);
  
}

function sendProfile(name, id) {

  // get total bridge

  var ssId = "17DpPcpdz1t-XjwHSjPjEI7V_p8A893YsYFhv1diYIco"
  var bridgeSheet = SpreadsheetApp.openById(ssId).getSheetByName("Bridge Leaderboard");
  var lastRow = bridgeSheet.getLastRow();
  var range = bridgeSheet.getRange("A1:A" + lastRow); // Assuming the "name" value is in column A
  
  // Get the cell with the value "name"
  var targetCell = range.createTextFinder(name).findNext();

  if (targetCell == null) {
    return sendMessage(id, "Invalid Name")
  }

  // Get the cell for total games
  var totalGames = targetCell.offset(0, 1).getValue().toFixed(0);
  var numWin = targetCell.offset(0, 2).getValue().toFixed(0);
  var numLose = targetCell.offset(0, 3).getValue().toFixed(0);
  var percentageWin = (targetCell.offset(0, 4).getValue()*100).toFixed(2);

  // Get total burp
  var burpSheet = SpreadsheetApp.openById(ssId).getSheetByName("Burp Counter");
  var burpLastRow = burpSheet.getLastRow();
  var burpRange = burpSheet.getRange("A1:A" + burpLastRow); // Assuming the "name" value is in column A
  
  // Get the cell with the value "name"
  var burpTargetCell = burpRange.createTextFinder(name).findNext();

  var totalBurp = burpTargetCell.offset(0, 1).getValue().toFixed(0);

  // get total fish
  const totalFish = getTotalFish(name);

  // get Hoops stats
  var hoopsSheet = SpreadsheetApp.openById(ssId).getSheetByName("Hoops Stats")
  var hoopsRange = hoopsSheet.getRange("A1:A" + hoopsSheet.getLastRow());
  var hoopsTargetCell = hoopsRange.createTextFinder(name).findNext();
  var totalHoops = hoopsTargetCell.offset(0,1).getValue().toFixed(0);
  var total3pt = hoopsTargetCell.offset(0,2).getValue().toFixed(0);
  var fgperc = (total3pt/totalHoops*100).toFixed(2);

  // set badges
  const isGoodBridge = percentageWin>= 50 ? " ⭐" : "";
  const isAngler = totalFish>=100 ?" 🎣":"";
  const isBurpMaster = totalBurp>=50 ? " 🤮":"";
  const isHoopMaster = total3pt>=50 ? " 🏀":"";

  let text = "__*" + name + "*'s Profile__" + isGoodBridge + isAngler + isBurpMaster + isHoopMaster + "\n"
            + "Total bridge games: " + totalGames + " \\(W" +numWin+"/L"+numLose+"\\)\n"
            + "Bridge %Win: " + String(percentageWin).replace(".", "\\.") + "%\n"
            + "Total fish caught: " + totalFish.toFixed(0) + "\n"
            + "Total burps: " + totalBurp + "\n"
            + "Total 3\\-pts: " +total3pt+"/"+ totalHoops + " \\("+ String(fgperc).replace(".", "\\.") +" FG%\\)\n"

  sendMessage(id, text)
}

function sendBadgeList(id){
  var text = "__*Badge List*\__ \n"
              + "⭐ \\- Have \\>\\= 50% win rate in bridge \n"
              + "🎣 \\- Fished \\>\\= 100 times \n"
              + "🤮 \\- Burped \\>\\= 50 times \n"
              + "🏀 \\- Shot \\>\\= 50 hoops \n"

  sendMessage(id, text);
}


function sendHelp(id) {
  var text = "__*Command List*\__ \n"
              + "/cheer \n"
              + "/jood \n"
              + "/dion \n"
              + "/addBurps \n"
              + "/burp \n"
              + "/iain \n"
              + "/zane \n"
              + "/coinflip \n"
              + "/dice \n"
              + "/leaderboard \n"
              + "/fish \n"
              + "/inventory \n"
              + "/shootHoops \n"
              + "/profile \n"
              + "/badgelist \n"
              + "/naneunwait \n"

  sendMessage(id, text);
}