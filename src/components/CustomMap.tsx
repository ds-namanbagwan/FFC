import * as React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { googleMapsApiKey } from "../constants";
import marker from "../images/marker.png";

const containerStyle = {
  width: "100%",
  height: "100%",
};

type props = {
  prop: any;
};

function CustomMap(coords: props) {
  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      {coords.prop.latitude && coords.prop.longitude ? (
        <>
          {" "}
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{
              lat: coords.prop && coords.prop.latitude,
              lng: coords.prop && coords.prop.longitude,
            }}
            zoom={16}
            options={{
              styles: [
                {
                  featureType: "administrative",
                  elementType: "all",
                  stylers: [
                    {
                      visibility: "simplified",
                    },
                  ],
                },
                {
                  featureType: "landscape",
                  elementType: "all",
                  stylers: [
                    {
                      visibility: "on",
                    },
                  ],
                },
                {
                  featureType: "poi",
                  elementType: "all",
                  stylers: [
                    {
                      visibility: "off",
                    },
                  ],
                },
                {
                  featureType: "transit",
                  elementType: "all",
                  stylers: [
                    {
                      visibility: "off",
                    },
                  ],
                },
              ],
            }}
          >
            <Marker
              position={{
                lat: coords.prop && coords.prop.latitude,
                lng: coords.prop && coords.prop.longitude,
              }}
              icon={marker}
            />
          </GoogleMap>
        </>
      ) : (
        <></>
      )}
    </LoadScript>
  );
}

export default CustomMap;
