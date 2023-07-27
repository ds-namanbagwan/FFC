import * as React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "@yext/pages/components";
import gaEvent from "../GTAEvents";
type c_foodItems = {
  prop: any;
  props1:any;
};
var desktopSliderType: string = "";
var tabSliderType: string = "";
var mobileSliderType: string = "";

var desktopSliderCenter: string = "";
var tabSliderCenter: string = "";
var mobileSliderCenter: string = "";

const FavoriteFood = (foodItem: c_foodItems) => {
  let length = foodItem.prop.length;
  desktopSliderType = length > 4 ? "loop" : "slide";

  tabSliderType = length > 2 ? "loop" : "slide";

  mobileSliderType = length > 1 ? "loop" : "slide";

  desktopSliderCenter = length > 4 ? "" : "center-4";

  tabSliderCenter = length > 2 ? "" : "center-2";

  mobileSliderCenter = length > 1 ? "" : "center-1";

  return (
    <>
      <div
        className={`food-list bg-light ${desktopSliderCenter} ${tabSliderCenter} ${mobileSliderCenter}`}
      >
        <div className="container">
          <div className="w-full text-center">
            <h3 className="sec_heading">Favourite Favorites</h3>
          </div>

          <Splide
            options={{
              rewind: false,
              type: desktopSliderType,
              perPage: 4,
              perMove: 1,
              arrows: true,
              drag: false,
              pagination: false,
              lazyLoad: "nearby",
              breakpoints: {
                1279: {
                  perPage: 2,
                  drag: true,
                  pagination: true,
                  type: tabSliderType,
                },
                575: {
                  perPage: 1,
                  padding: "45px",
                  type: mobileSliderType,
                },
              },
            }}
          >
            {foodItem.prop &&
              foodItem.prop.map((i: any, index: any) => {
                return (
                  <SplideSlide key={index}>
                    <div className="slide-img">
                      <img
                        src={i.image ? i.image.url : ""}
                        className="block"
                        alt={i.description}
                        width="360"
                        height="360"
                        loading="lazy"
                      />
                      {i.description || i.details || i.image.alternateText ? (
                        <h4>
                          {i.description ? (
                            i.description
                          ) : (
                            <>
                              {i.details ? (
                                i.details
                              ) : (
                                <>
                                  {i.image.alternateText
                                    ? i.image.alternateText
                                    : ""}
                                </>
                              )}
                            </>
                          )}
                        </h4>
                      ) : (
                        <></>
                      )}
                    </div>
                  </SplideSlide>
                );
              })}
          </Splide>
        </div>
        <div style={{marginLeft:"575px"}}>
        {foodItem?.props1 ? (
              <>
                {foodItem?.props1?.label && foodItem?.props1?.link ? (
                  <div className="cta_btn">
                    <Link
                      rel="noopener noreferrer"
                      data-ya-track="cta_button"
                      eventName={foodItem?.props1?.label}
                      // conversionDetails={conversionDetails_primaryCTA}
                      href={
                        foodItem?.props1?.linkType == "PHONE"
                          ? `tel:${foodItem?.props1?.link}`
                          : foodItem?.props1?.linkType == "EMAIL"
                            ? `mailto:${foodItem?.props1?.link}`
                            : foodItem?.props1?.link
                      }
                      className="button"
                      target={
                        foodItem?.props1?.linkType == "PHONE"
                          ? "_self"
                          : foodItem?.props1?.linkType == "URL"
                            ? "_self"
                            : foodItem?.props1?.linkType == "OTHER"
                              ? "_blank"
                              : "_self"
                      }
                      onClick={() =>
                        gaEvent(
                          "Restaurant",
                          foodItem?.props1?.label,
                          foodItem?.props1?.label,
                          1
                        )
                      }
                    >
                      {foodItem?.props1 ? foodItem?.props1?.label : ""}
                    </Link>
                  </div>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
      </div>
      
    </>
  );
};

export default FavoriteFood;
