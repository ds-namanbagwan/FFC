import * as React from "react";
import { useEffect } from "react";
import Logo from "../images/logo.svg";
import appStore from "../images/play-store-icon.svg";
import googlePlay from "../images/app-store-icon.svg";
import "../main.css";
import { svgIcons } from "../svgIcon";
import { Link } from "@yext/pages/components";

import gaEvent from "../GTAEvents";
type props = {
  data: any;
  facebookPageUrl: any;
  instagramHandle: any;
  twitterHandle: any;
  c_tikTok: any;
  appStore: any;
  playStore: any;
};

var insta: Boolean = false;
var twitter: Boolean = false;
var tiktok: Boolean = false;
var facebook: Boolean = false;

const Header = (headerItem: props) => {
  useEffect(() => {
    document.body.setAttribute("id", "body");

    let checkInsta = headerItem.instagramHandle
      ? headerItem.instagramHandle.includes("https://www.instagram.com")
      : "";

    insta = checkInsta;

    let checktwitter = headerItem.twitterHandle
      ? headerItem.twitterHandle.includes("https://twitter.com")
      : "";

    twitter = checktwitter;

    let checktiktok = headerItem.c_tikTok
      ? headerItem.c_tikTok
      : "".includes("https://www.tiktok.com");

    tiktok = checktiktok;

    let checkfacebook = headerItem.facebookPageUrl
      ? headerItem.facebookPageUrl.includes("https://www.facebook.com")
      : "";
    facebook = checkfacebook;
  });

  const toggle = () => {
    document.getElementById("body").classList.toggle("menu-opened");
  };
  // useEffect(() => {
  //   return (
  //     <ScriptTag id="facebook-pixel">
  //       {`
  //   !function(f,b,e,v,n,t,s)
  //   {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  //   n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  //   if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  //   n.queue=[];t=b.createElement(e);t.async=!0;
  //   t.src=v;s=b.getElementsByTagName(e)[0];
  //   s.parentNode.insertBefore(t,s)}(window, document,'script',
  //   'https://connect.facebook.net/en_US/fbevents.js');
  //   fbq('init', 'khfkfhkhdkghk);
  //   fbq('track', 'PageView');
  // `}
  //     </ScriptTag>
  //   );
  // });
  return (
    <>
      <div className="site-header">
        <div className="header-top">
          <div className="container flex flex-row justify-between items-center">
            <div className="logo">
              <Link
                href={"https://favorite.co.uk/"}
                rel="noopener noreferrer"
                eventName={`homeLogo`}
                onClick={() => gaEvent("Restaurant", "homeLogo", "HeaderLogo", 1)}
              >
                <img
                  src={Logo}
                  alt="Favorite Fried Chicken"
                  width="456"
                  height="98"
                />
              </Link>
            </div>
            <a
              href="#"
              className="store-locator-link"
              data-ya-track="storeLocator"
              onClick={() => gaEvent("Restaurant", "storeLocator", "storeLocator", 1)}
            >
              {svgIcons.addressPinHeader}
            </a>
            <button
              type="button"
              className="menu-btn"
              id="menu-btn"
              onClick={toggle}
              name="toggle-button"
            >
              <span></span>
            </button>

            <div className="app-link">
              {headerItem.playStore ? (
                <>
                  <Link
                    target="_blank"
                    href={headerItem.playStore}
                    rel="noopener noreferrer"
                    eventName={`googlePlay`}
                    onClick={() =>
                      gaEvent("Restaurant", "googlePlay", "googlePlayIcon", 1)
                    }
                  >
                    <img src={appStore} alt="Google Play" />{" "}
                    <span>
                      GET IT ON <b>Google Play</b>
                    </span>
                  </Link>
                </>
              ) : (
                ""
              )}
              {headerItem.appStore ? (
                <Link
                  target="_blank"
                  href={headerItem.appStore}
                  rel="noopener noreferrer"
                  eventName={`appStore`}
                  onClick={() =>
                    gaEvent("Restaurant", "appStore", "appStoreIcon", 1)
                  }
                >
                  <img src={googlePlay} alt="App Store" />{" "}
                  <span>
                    Download on the <b>App Store</b>
                  </span>
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <nav className="navigation">
          <div className="container flex flex-row justify-between">
            <ul id="main-nav" className="main-nav">
              {headerItem.data &&
                headerItem.data.map((e: any, index: any) => {
                  return (
                    <>
                      <li className="group relative" key={index.toString()}>
                        <a
                          href="#"
                          data-ya-track="headerItem"
                          onClick={() =>
                            gaEvent("Restaurant", "headerItem", "headerItem", 1)
                          }
                        >
                          {e.nav1}
                        </a>
                        <ul className="submenu">
                          {e.nav2.map((e: any, index: any) => {
                            return (
                              <li key={index.toString()}>
                                <Link
                                  href={e.link}
                                  rel="noopener noreferrer"
                                  eventName={`headerMenuItem`}
                                  onClick={() =>
                                    gaEvent(
                                      "Restaurant",
                                      "headerMenuItem",
                                      "headerItem",
                                      "1"
                                    )
                                  }
                                >
                                  {e.label}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    </>
                  );
                })}
            </ul>

            <ul className="social-links">
              {headerItem.facebookPageUrl ? (
                <li>
                  <Link
                    target="_blank"
                    href={headerItem.facebookPageUrl}
                    rel="noopener noreferrer"
                    eventName={`socialLinks`}
                    onClick={() =>
                      gaEvent("Restaurant", "socialLinks", "facebookLink", 1)
                    }
                  >
                    {svgIcons.facebook}
                  </Link>
                </li>
              ) : (
                ""
              )}
              {headerItem.instagramHandle ? (
                <li>
                  <Link
                    target="_blank"
                    href={
                      insta
                        ? `/${headerItem.instagramHandle}`
                        : `https://www.instagram.com/${headerItem.instagramHandle}`
                    }
                    rel="noopener noreferrer"
                    eventName={`socialLinks`}
                    onClick={() =>
                      gaEvent("Restaurant", "socialLinks", "instagramLink", 1)
                    }
                  >
                    {svgIcons.instagram}
                  </Link>
                </li>
              ) : (
                ""
              )}
              {headerItem.twitterHandle ? (
                <li>
                  <Link
                    target="_blank"
                    href={
                      twitter
                        ? `/${headerItem.twitterHandle}`
                        : `https://twitter.com/${headerItem.twitterHandle}`
                    }
                    rel="noopener noreferrer"
                    eventName={`socialLinks`}
                    onClick={() =>
                      gaEvent("Restaurant", "socialLinks", "twitterLink", 1)
                    }
                  >
                    {svgIcons.twitter}
                  </Link>
                </li>
              ) : (
                ""
              )}
              {headerItem.c_tikTok ? (
                <li>
                  <Link
                    target="_blank"
                    href={
                      tiktok
                        ? `/${headerItem.c_tikTok}`
                        : `https://www.tiktok.com/${headerItem.c_tikTok}`
                    }
                    rel="noopener noreferrer"
                    eventName={`socialLinks`}
                    onClick={() =>
                      gaEvent("Restaurant", "socialLinks", "tiktokLink", 1)
                    }
                  >
                    {svgIcons.tiktok}
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
