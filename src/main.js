require('dotenv').config()
const fetch = require('node-fetch')
const nodemailer = require("nodemailer");
(async function run(){
 const locationRequest = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/KE/search?q=${encodeURIComponent('Nairobi')}&apikey=${process.env.ACCUWEATHER_API_KEY}`);
 const locationData = await locationRequest.json();
 const locationKey = locationData[0].Key;
 const forecastRequest = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${process.env.ACCUWEATHER_API_KEY}`);
 const forecastData = await forecastRequest.json();
 const temperature = forecastData.DailyForecasts[0].Temperature;

    // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER_EMAIL, // generated ethereal user
      pass: process.env.MAIL_USER_PASSWORD, // generated ethereal password
    },
  });


  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.MAIL_FROM, // sender address
    to: "odenyothadeus@gmail.com, thadeus@peakanddale.com, elena.popa@zippie.com", // list of receivers
    subject: "Daily Report", // Subject line
    text: `Daily Report`, // plain text body
    html: `
    <h1>Daily Reports</h1>
    <h2>Weather Forecast</h2>
    <p>Forecast: ${forecastData.Headline.Text}</p>
    <p>Min: ${temperature.Minimum.Value}°${temperature.Minimum.Unit}</p>
    <p>Max: ${temperature.Maximum.Value}°${temperature.Maximum.Unit}</p>
    `, // html body
  });

})()