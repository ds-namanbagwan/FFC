import * as React from "react";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "@yext/pages/components";
import {
  stagingBaseUrl,
  slugify,
  conversionDetailsDirection,
  conversionDetailsPhone,
} from "../constants";
import { svgIcons } from "../svgIcon";
import getDirectionUrl from "../getDirection";
import gaEvent from "../GTAEvents";

type props = {
  prop: any;
  parents: any;
  baseUrl: any;
  coords: any;
  slug: any;
  what3WordsAddress: any;
};
/**
 * Used to Fetch Near By Locations to a store
 * @param entities
 * @returns
 */
const NearByLocation = (entities: props) => {
  //MILES
  const miles = entities.prop.response.distances && entities.prop.response.distances?.map((miles: any) => {
    return miles;
  })

  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

  return (
    <>
      <div className="nearby-sec">
        <div className="container">
          <div className="w-full text-center">
            <h3 className="sec_heading">Nearby Favorite Locations</h3>
          </div>
          <Splide
            id="splide-nearby"
            options={{
              rewind: false,
              type: "slide",
              perPage: 3,
              perMove: 1,
              arrows: false,
              drag: false,
              pagination: false,
              lazyLoad: "nearby",
              breakpoints: {
                1279: {
                  perPage: 1,
                  drag: true,
                  pagination: true,
                  arrows: true,
                  type: "splide",
                },
                575: {
                  arrows: false,
                },
              },
            }}
          >

            {entities.prop.response.entities &&
              entities.prop.response.entities.map((e: any, index: any) => {

                let url = "";
                if (!e.slug) {
                  let slugString = e.meta.id + " " + e.name;
                  let slug = slugify(slugString);
                  url = `${slug}.html`;
                } else {
                  url = `${e.slug.toString()}.html`;
                }

                if (entities.slug != e.slug && e.closed != true) {
                  let addressString = "";
                  let addressLines = e.address?.line1 + ", " + e.address?.line2;

                  if (addressLines.length > 42) {
                    addressString += e.address?.line1 + ", <br />";
                    let addressLine =
                      e.address?.line2 + ", " + e.address?.city + ", ";
                    if (addressLine.length > 42) {
                      addressString +=
                        e.address?.line2 + ", " + e.address?.city + ",<br />";
                      addressString +=
                        e.address?.postalCode +
                        ", " +
                        regionNames.of(e.address?.countryCode);
                    } else {
                      addressString +=
                        e.address?.line2 +
                        ", " +
                        e.address?.city +
                        ", " +
                        e.address?.postalCode +
                        ", <br />";
                      addressString += regionNames.of(e.address?.countryCode);
                    }
                  } else {
                    let line2 = "";
                    if (e.address?.line2 != undefined) {
                      line2 = e.address?.line2 + ", ";
                    }
                    addressString += e.address?.line1 + ", " + line2 + "<br />";
                    addressString +=
                      e.address?.city +
                      ", " +
                      e.address?.postalCode +
                      ", <br />";
                    addressString += regionNames.of(e.address?.countryCode);
                  }

                  const what3WordsAddressString = e.what3WordsAddress ? (
                    <div className="store-phone w3w">
                      {svgIcons.what3Words}
                      <Link
                        target="_blank"
                        href={
                          e.what3WordsAddress
                            ? `https://what3words.com/${e.what3WordsAddress} `
                            : ""
                        }
                        rel="noopener noreferrer"
                        eventName={`what3WordsLink`}
                        onClick={() =>
                          gaEvent("Restaurant", "what3WordsLink", "W3Words", 0)
                        }
                      >
                        What3Words
                      </Link>
                    </div>
                  ) : (
                    ""
                  );

                  return (
                    <SplideSlide key={index}>

                      <div className="near-location">
                        <h4>
                          <a href={`${stagingBaseUrl}/${url}`}>{e.name}</a>

                          {miles.map((items: any, index1: Number) => {
                            return (
                              <>
                                {index == index1 && (
                                  <p className="text-red">{(items.distanceMiles.toFixed(3))}</p>)}
                              </>
                            )
                          })}
                        </h4>
                        <div className="store-address">
                          {svgIcons.addressPin}
                          <p
                            dangerouslySetInnerHTML={{ __html: addressString }}
                          />
                        </div>
                        {what3WordsAddressString}
                        {e.mainPhone ? (
                          <>
                            <div className="store-phone">
                              {svgIcons.phoneIcon}
                              <p>
                                <Link
                                  data-ya-track="phone"
                                  href={`tel:${e.mainPhone}`}
                                  rel="noopener noreferrer"
                                  conversionDetails={conversionDetailsPhone}
                                  eventName={`phone`}
                                  onClick={() =>
                                    gaEvent("Restaurant", "phone", "phone", 1)
                                  }
                                >
                                  {e.mainPhone}
                                </Link>
                              </p>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}

                        <div className="store-link">
                          <Link
                            data-ya-track="directions"
                            className="direction"
                            onClick={() => {
                              gaEvent(
                                "Restaurant",
                                "getdirections",
                                "getDirection",
                                1
                              );
                              getDirectionUrl(e);
                            }}
                            href="javascript:void(0);"
                            rel="noopener noreferrer"
                            eventName={`getdirections"`}
                            conversionDetails={conversionDetailsDirection}
                          >
                            {svgIcons.getDirection} Get Directions
                          </Link>
                          <Link
                            className="view-details"
                            href={`${stagingBaseUrl}/${url}`}
                            rel="noopener noreferrer"
                            eventName={`storeViewDetails`}
                            onClick={() => {
                              gaEvent(
                                "Restaurant",
                                "storeViewDetails",
                                "viewStoreDetail",
                                1
                              );
                            }}
                          >
                            {" "}
                            {svgIcons.viewDetails} View Details
                          </Link>
                        </div>
                      </div>
                    </SplideSlide>
                  );
                }
              })}
          </Splide>
        </div>
      </div>
    </>
  );
};
export default NearByLocation;
