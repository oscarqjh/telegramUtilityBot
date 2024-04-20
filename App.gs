////////////// MAIN DRIVER FUNCTION //////////////

// run on HTTP GET
function doGet()
{
  return HtmlService.createHtmlOutputFromFile('Test');
}

// run on HTTP POST
function doPost(e)
{
  var contents = JSON.parse(e.postData.contents);
  
  if (contents.hasOwnProperty("message")) {
    var msg = contents.message;
    var chatId = msg.chat.id;
    var fromID = msg.from.id;

    if ( msg.hasOwnProperty("entities") &&
          msg.entities[0].type == "bot_command") {
            if (msg.text == '/cheer') {
              return sendCheer(chatId);
            }
            if (msg.text == "/jood") {
              return sendJood(chatId);
            }
            if (msg.text == "/dion") {
              return sendDion(chatId);
            }
            if (msg.text.includes("/addBurps")) {
              var name = msg.text.split(" ");
              return addBurps(name[1], chatId);
            }
            if (msg.text == "/iain") {
              return sendIain(chatId);
            }
            if (msg.text == "/zane") {
              return sendZane(chatId);
            }
            if (msg.text == "/coinflip") {
              return coinflip(chatId);
            }
            if (msg.text == "/leaderboard") {
              return sendLeaderboard(chatId);
            }
            if (msg.text == "/dice") {
              return sendDice(chatId);
            }
            if (msg.text == "/help") {
              return sendHelp(chatId);
            }
            if (msg.text == "/fish") {
              const name = teleIDs[fromID];
              return doFish(name, chatId);
            }
            if (msg.text == "/inventory") {
              const name = teleIDs[fromID];
              return showInventory(name, chatId);
            }
            if (msg.text == "/burp") {
              return sendBurp(chatId);
            }
            if (msg.text == "/shootHoops") {
              const name = teleIDs[fromID];
              return shootHoops(name, chatId);
            }
            if (msg.text.includes("/profile")) {
              var targetname = msg.text.split(" ");
              if (targetname.length == 2) {
                return sendProfile(targetname[1], chatId);
              } else {
                const name = teleIDs[fromID];
                return sendProfile(name, chatId);
              }
            }
            if (msg.text == "/naneunwait"){
              return sendYouWait(chatId);
            }
            if (msg.text == "/badgelist") {
              return sendBadgeList(chatId);
            }
          }
  }

  return;
}

function setWebhook()
{
  var url = telegramAPI + "/setWebhook?url="+webAppUrl;
  var response = UrlFetchApp.fetch(url);
  Logger.log(response);
}

