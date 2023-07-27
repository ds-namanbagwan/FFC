import * as React from "react";
import phone from "../images/phone.png";
import appStore from "../images/app-store.svg";
import playStore from "../images/play-store.svg";
import bgImg from "../images/app-bg.png";
import { Link } from "@yext/pages/components";
import gaEvent from "../GTAEvents";
type Props = {
  c_title: any;
  c_description1: any;
  c_backgroundImages: any;
  androidAppUrl: any;
  iosAppUrl: any;
};

const AddPromotion = (Data: Props) => {
  const [data, setData] = React.useState(Data.c_description1);
  const [myArray, setMyArray] = React.useState([]);
  React.useEffect(() => {
    if (data) {
      let test = data.replace(/[\\]/g, "");

      let Array = test.split("\n");
      setMyArray(Array);
    }
  }, []);

  return (
    <>
      <div className="app_promotion-sec">
        <img
          className="app-bg"
          src={Data.c_backgroundImages ? Data.c_backgroundImages.url : bgImg}
          alt="app-bg"
          title="app-bg"
          loading="lazy"
          width="1833"
          height="385"
        />
        <div className="container flex flex-wrap items-center">
          <div className="w-full app_promotion-content">
            <h3>{Data.c_title ? Data.c_title : ""}</h3>
            {myArray &&
              myArray.map((i: any, index) => {
                if (i) {
                  return (
                    <>
                      <p key={index.toString()}>{i}</p>
                    </>
                  );
                }
              })}

            <div className="get-app-link">
              <ul>
                {Data.androidAppUrl ? (
                  <li>
                    <Link
                      target="_blank"
                      href={Data.androidAppUrl ? Data.androidAppUrl : ""}
                      rel="noopener noreferrer"
                      eventName={`googlePlay`}
                      onClick={() => {
                        gaEvent("Restaurant", "googlePlay", "googlePlayIcon", 1);
                      }}
                    >
                      <img
                        loading="lazy"
                        src={playStore ? playStore : ""}
                        alt="google store"
                        width="170"
                        height="50"
                      />
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                {Data.iosAppUrl ? (
                  <>
                    <li>
                      <Link
                        target="_blank"
                        href={Data.iosAppUrl ? Data.iosAppUrl : ""}
                        rel="noopener noreferrer"
                        eventName={`appStore`}
                        onClick={() => {
                          gaEvent("Restaurant", "appStore", "appStoreIcon", 1);
                        }}
                      >
                        <img
                          loading="lazy"
                          src={appStore ? appStore : ""}
                          alt="app store"
                          width="170"
                          height="50"
                        />
                      </Link>
                    </li>
                  </>
                ) : (
                  <></>
                )}
              </ul>
            </div>
          </div>

          <div className="phone-img">
            <img
              src={phone}
              alt="phone-img"
              loading="lazy"
              width="288"
              height="365"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default AddPromotion;
