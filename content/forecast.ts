// Windguru's Hangin/Bulabog spot and official widget generator, checked 2026-09-13.
// Source and embed boundary: docs/decisions/0003-optional-windguru-forecast.md.
export const windguruForecast = {
  url: "https://www.windguru.cz/1280920",
  embedUrl: "https://www.windguru.cz/widget-fcst-iframe.php?s=1280920&m=3&uid=wg_hangin&ai=0&wj=knots&tj=c&waj=m&tij=cm&odh=0&doh=24&fhours=72&hrsm=3&vt=forecasts&lng=en&p=WINDSPD,GUST,SMER,TMPE,APCP1s",
} as const;
