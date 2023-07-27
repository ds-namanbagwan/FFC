import * as React from "react";
import CookieConsent from "react-cookie-consent";
import { cookieText, newsLetter, cookiesUrl } from "../constants";
import { Link } from "@yext/pages/components";
import gaEvent from "../GTAEvents";
type props = {
  data: any;
  address: any;
  c_companyrn: any;
  c_phoneNumber: any;
  facebookPageUrl: any;
  instagramHandle: any;
  twitterHandle: any;
  c_tikTok: any;
  newsLetter: any;
};

import { svgIcons } from "../svgIcon";
var insta: Boolean = false;
var twitter: Boolean = false;
var tiktok: Boolean = false;
var facebook: Boolean = false;

/**
 * Used to show FFC address and social media urls and cookies
 * @param entities
 * @returns
 */

const Footer = (footer: props) => {
  const [data, setData] = React.useState([]);
  const [address, setAddress] = React.useState({});

  React.useEffect(() => {
    setData(footer.data);
    setAddress(footer.address);
    /** footer social media urls */
    insta = footer.instagramHandle
      ? footer.instagramHandle.includes("https://www.instagram.com")
      : "";
    twitter = footer.twitterHandle
      ? footer.twitterHandle.includes("https://twitter.com")
      : "";
    tiktok = footer.c_tikTok
      ? footer.c_tikTok
      : "".includes("https://www.tiktok.com");
    facebook = footer.facebookPageUrl
      ? footer.facebookPageUrl.includes("https://www.facebook.com")
      : "";
  });

  return (
    <>
      <div className="newsletter">
        <div className="container">
          <Link
            className="signup-newsletter"
            href={newsLetter}
            rel="noopener noreferrer"
            eventName={`Sign Up to Our Newsletter`}
            onClick={() => gaEvent("Restaurant", "Sign Up to Our Newsletter", "newsLetter", 1)}
          >
            Sign Up to Our Newsletter
          </Link>
        </div>
      </div>

      <footer className="site-footer">
        <div className="container flex flex-col lg:flex-row justify-between">
          <div className="">
            <ul className="footer-links">
              {data &&
                data.map((e: any) => {
                  return (
                    <li>
                      <Link
                        href={e.link}
                        rel="noopener noreferrer"
                        eventName={`footerMenuItem`}
                        onClick={() =>
                          gaEvent("Restaurant", "footerMenuItem", "footerItem", 1)
                        }
                      >
                        {e.label}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="footer-address">
            <p>{address.line1 ? address.line1 : ""}</p>
            <p>{address.line2 ? address.line2 : ""},</p>
            <p>
              {address.postalCode ? address.postalCode : ""},{" "}
              {address.region ? address.region : ""}|
              {footer.c_phoneNumber ? footer.c_phoneNumber : ""}
            </p>
            <p> {footer.c_companyrn ? footer.c_companyrn : ""}</p>
          </div>
          <div className="text-center">
            <ul className="social-links">
              {footer.facebookPageUrl ? (
                <li>
                  <Link
                    target="_blank"
                    href={
                      facebook
                        ? `${footer.facebookPageUrl}`
                        : ` https://www.facebook.com/${footer.facebookPageUrl}`
                    }
                    rel="noopener noreferrer"
                    eventName={`socialLinks`}
                    onClick={() =>
                      gaEvent(
                        "Restaurant",
                        "socialLinks",
                        "footer scoial media link",
                        1
                      )
                    }
                  >
                    {svgIcons.facebook}
                  </Link>
                </li>
              ) : (
                ""
              )}
              {footer.instagramHandle ? (
                <li>
                  <Link
                    target="_blank"
                    href={
                      insta
                        ? `/${footer.instagramHandle}`
                        : `https://www.instagram.com/${footer.instagramHandle}`
                    }
                    rel="noopener noreferrer"
                    eventName={`socialLinks`}
                    onClick={() =>
                      gaEvent(
                        "Restaurant",
                        "socialLinks",
                        "footer scoial media link",
                        1
                      )
                    }
                  >
                    {svgIcons.instagram}
                  </Link>
                </li>
              ) : (
                ""
              )}
              {footer.twitterHandle ? (
                <li>
                  <Link
                    target="_blank"
                    href={
                      twitter
                        ? `/${footer.twitterHandle}`
                        : `https://twitter.com/${footer.twitterHandle}`
                    }
                    rel="noopener noreferrer"
                    eventName={`socialLinks`}
                    onClick={() =>
                      gaEvent(
                        "Restaurant",
                        "socialLinks",
                        "footer scoial media link",
                        1
                      )
                    }
                  >
                    {svgIcons.twitter}
                  </Link>
                </li>
              ) : (
                ""
              )}
              {footer.c_tikTok ? (
                <li>
                  <Link
                    target="_blank"
                    href={
                      tiktok
                        ? `/${footer.c_tikTok}`
                        : `https://www.tiktok.com/${footer.c_tikTok}`
                    }
                    rel="noopener noreferrer"
                    eventName={`socialLinks`}
                    onClick={() =>
                      gaEvent(
                        "Restaurant",
                        "socialLinks",
                        "footer scoial media link",
                        1
                      )
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
        </div>
      </footer>
      <CookieConsent
        cookieName={"cb-enabled"}
        cookieValue={"accepted"}
        buttonText={"Accept"}
        buttonStyle={{
          marginLeft: "100px",
        }}
      >
        <p>
          {cookieText}
          <Link
            className="text-[#d61a0c]"
            href={cookiesUrl}
            rel="noopener noreferrer"
            eventName={`cookiesPolicy`}
            onClick={() => gaEvent("Restaurant", "cookiesPolicy", "CookiesPolicy", 1)}
          >
            cookies policy
          </Link>
          .
        </p>
      </CookieConsent>
    </>
  );
};

export default Footer;
