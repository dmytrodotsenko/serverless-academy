const TelegramBot = require("node-telegram-bot-api");
const { getWeatherForecast } = require("./apiCalls");
const token = "6507432213:AAFWsFIu74ZZvG_mVCXbLMs91sO0XQHp2-g";
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg, match) => {
  const opts = {
    reply_to_message_id: msg.message_id,
    reply_markup: JSON.stringify({
      keyboard: [["Forecast in Lviv"]],
    }),
  };
  bot.sendMessage(
    msg.chat.id,
    "Hi. I am a simple bot. You can get the current price and blockchain height. Have fun!",
    opts
  );
});
bot.onText(/Forecast in Lviv/, (msg) => {
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "3 hours",
            callback_data: JSON.stringify({
              request: "3h",
              timeout: 3 * 60 * 60 * 1000,
            }),
          },
          {
            text: "6 hours",
            callback_data: JSON.stringify({
              request: "6h",
              timeout: 6 * 60 * 60 * 1000,
            }),
          },
        ],
      ],
    },
  };
  bot.sendMessage(msg.chat.id, "Choose interval of forecasting", opts);
});

const showWeather = (chatID) => {
  getWeatherForecast().then((data) => {
    const weather = data.list[0].main;
    bot.sendMessage(
      chatID,
      `Forecasts for Lviv: 
        Temperature: ${weather.temp},
        Feels like: ${weather.feels_like}
        Humidity: ${weather.humidity}`
    );
  });
};

bot.on("callback_query", function onCallbackQuery(callbackQuery) {
  const data = JSON.parse(callbackQuery.data);
  const chatID = callbackQuery.message.chat.id;
  showWeather(chatID);
  const scheduler = setInterval(() => showWeather(chatID), data.timeout);
});
