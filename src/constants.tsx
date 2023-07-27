export const limit = 4;
export const radius = 1500;
export const defaultQuery = "";
export const api_base_url = "https://liveapi.yext.com/v2/accounts/me/";
export const liveAPIKey = "2d38170af8568fa1bc51c18f60110d65";
export const googleMapsApiKey = "AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18";
export const savedFilterId = "1237618169";
export const entityTypes = "restaurant";
export const stagingBaseUrl = "https://favorite.co.uk/store-finder";
export const livSiteUrl = "https://favorite.co.uk/";
export const cookieText =
  "We use cookies on our website. Some are essential to enable to site to function, others are analytical and help us monitor site usage, whilst some are used for the personalisation of ads. You are free to manage this via your browser setting at any time. To learn more about how we use these cookies, please see our ";
export const bannerText = "Favorite - Britain's Tastiest Chicken!";
export const newsLetter = "https://favorite.co.uk/newsletter";
export const locator = "https://favorite.co.uk/store-finder";
export const callNearByApi = "server-side"; // use "client-side" for client side api calling
export const robotsMetaStatus = "index, follow";
export const googleAnalytics = {
  trackingCode: "G-Q0G8Z8S78C",
  // trackingCode: "",
  testMode: false,
  debugMode: false,
};

export const OrganizationAddress = {
  type: "PostalAddress",
  streetAddress: "7 Davy Road",
  addressLocality: "Clacton-on-Sea",
  addressRegion: "Essex",
  postalCode: "CO15 4XD",
  addressCountry: "United Kingdom",
};
export const OrganizationTelephone = "01255 222568";
export const OrganizationSocialMediaUrls = {
  facebook: "https://www.facebook.com/FavoriteChicken",
  instagram: "https://www.instagram.com/favoritechickenribs",
  twitter: "https://twitter.com/FavoriteChicken",
};
export const OrganizationName = "Favorite Fried Chicken Limited";
export const OrganizationLogo =
  "https://favorite.co.uk/assets/img/logo-social.png";
export const cookiesUrl = "https://favorite.co.uk/cookies";

export function slugify(slugString: any) {
  slugString.toLowerCase().toString();
  slugString = slugString.replace(/[&\/\\#^+()$~%.'":*?<>{}!@]/g, "");
  slugString = slugString.replaceAll("  ", "-");
  slugString = slugString.replaceAll(" ", "-");
  return slugString.toLowerCase();
}
export function changeDateFormat(date: any) {
  date = date && date.split("-")
  let year = date && date[0]
  let month = date && date[1]
  let day = date && date[2]
  date = day + "/" + month + "/" + year;
  return date;
}

export const conversionDetailsDirection = {
  cid: "e801ea67-1c6e-4815-baac-e61a111e9f77",
  cv: "1",
};

export const conversionDetailsPhone = {
  cid: "de598c07-b53c-407a-89f8-adc289ae9d62",
  cv: "2",
};

export const defaultTimeZone = "Europe/London";

export const AnalyticsEnableDebugging = true;
export const AnalyticsEnableTrackingCookie = true;
export const AdditionalHoursText = "Coming Soon";
