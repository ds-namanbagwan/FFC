var userLocation:any = false;
const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
export default function getDirectionUrl(entitiy: any) {
  var address_string = "";
  if(entitiy.address.line1) address_string += entitiy.address.line1 +",";
  if(entitiy.address.line2) address_string += entitiy.address.line2 +",";
  if(entitiy.address.city) address_string += entitiy.address.city +",";
  if(entitiy.address.region) address_string += entitiy.address.region +",";
  if(entitiy.address.postalCode) address_string += entitiy.address.postalCode +",";
  address_string += regionNames.of(entitiy.address.countryCode);
  address_string = address_string.replace("undefined,","");
  
  let googlePlaceId = entitiy.googlePlaceId?entitiy.googlePlaceId:false;

  var origin: any = null;
  if (entitiy.address.city) {
    origin = entitiy.address.city;
  } else if (entitiy.address.region) {
    origin = entitiy.address.region;
  } else {
    origin = entitiy.address.country;
  }
  let directionUrl = `https://www.google.com/maps/dir/?api=1&destination=`+encodeURIComponent(address_string);
  if(googlePlaceId) directionUrl += `&destination_place_id=${googlePlaceId}`;
       
  if(userLocation){
    let currentLatitude = userLocation.coords.latitude;
    let currentLongitude = userLocation.coords.longitude;
    directionUrl += `&origin=${currentLatitude},${currentLongitude}`;
    window.open(directionUrl, "_blank");
  }else if (navigator.geolocation) {
    const error = (error: any) => {
      directionUrl += `&origin=`+ encodeURIComponent(origin);
      window.open(directionUrl, "_blank");
    };
    navigator.geolocation.getCurrentPosition(
      function (position) {
        userLocation = position;
        let currentLatitude = position.coords.latitude;
        let currentLongitude = position.coords.longitude;
        directionUrl += `&origin=${currentLatitude},${currentLongitude}`;
        window.open(directionUrl, "_blank");
      },
      error,
      {
        timeout: 10000,
      }
    );
  }else{
      directionUrl += `&origin=`+ encodeURIComponent(origin);
      window.open(directionUrl, "_blank");
  }
}
