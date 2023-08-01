import * as React from "react";
import Banner from "../components/banner";
import List from "../components/list";
import BreadCrumbs from "../components/BreadCrumbs";
import { setUrl } from "../API/index";
import LocationInformation from "../components/LocationInformation";
import Header from "../components/header";
import Footer from "../components/footer";
import Card from "../components/card";
import AddPromotion from "../components/AddPromotion";
import NearByLocation from "../components/NearByLocation";
import Faq from "../components/Faq";
import FavoriteFood from "../components/FavoriteFood";
import { nearByLocation } from "../types/nearByLocation";
import { JsonLd } from "react-schemaorg";
import favicon from "../images/favicon-live.png";
import bannerImage from "../images/app-bg.png";
import { fetch } from "@yext/pages/util";
import { Link } from "@yext/pages/components";
import Logo from "../images/logo.svg";
import MyCustomScriptComponent from "../components/FacebookPixel";
import ReactGA from "react-ga4";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
} from "@yext/pages/components";
import {
  radius,
  api_base_url,
  liveAPIKey,
  savedFilterId,
  entityTypes,
  limit,
  stagingBaseUrl,
  newsLetter,
  robotsMetaStatus,
  OrganizationAddress,
  OrganizationTelephone,
  OrganizationSocialMediaUrls,
  livSiteUrl,
  OrganizationName,
  OrganizationLogo,
  slugify,
  AnalyticsEnableDebugging,
  AnalyticsEnableTrackingCookie,
  googleAnalytics,
} from "../constants";
import "../main.css";
import {
  Template,
  GetPath,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  TransformProps,
  HeadConfig,
} from "@yext/pages";


export const config: TemplateConfig = {
  stream: {
    $id: "restaurant",
    fields: [
      "id",
      "uid",
      "description",
      "slug",
      "geocodedCoordinate",
      "yextDisplayCoordinate",
      "googlePlaceId",
      /* banner */
      "c_cTAButton",
      "c_tagline",
      "c_backgroundImage",
      "name",
      /*storeInfo*/
      "hours",
      "c_cTAButton2",
      "c_deliveryServicesJustEat",
      "c_deliveryServicesUberEats",
      "c_deliveryServicesDeliveroo",
      /*new storeInfo links*/
      "c_deliveryServicesUberEatsForPages",
      "c_deliveryServicesDeliverooForPages",
      "c_deliveryServicesJustEatForPages",
      /* end */
      "address",
      "mainPhone",
      "deliveryHours",
      "timezone",
      "what3WordsAddress",
      "additionalHoursText",
      /*social Media*/
      "facebookPageUrl",
      "instagramHandle",
      "twitterHandle",
      "c_tikTok",
      /*business information*/
      "c_headingH2",
      "c_description",
      /*our food*/
      "c_ourFoods",
      /*Best Selling Favourite Favorites*/
      "c_bestSellingFavouriteFavorite",
      /*Download the app*/
      "c_title",
      "c_description2",
      "c_backgroundImages",
      "androidAppUrl",
      "iosAppUrl",
      /*faq*/
      "frequentlyAskedQuestions",
      /*seo*/
      "c_canonical",
      "c_metaDescription",
      "c_metaTitle",
      "logo",
      /* DM fields */
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
      "dm_directoryParents.c_addressRegionDisplayName",
      "c_abouttest",
      "c_ordernowCTA",
      "c_autogenerate"
    ],
    localization: {
      locales: ["en_GB"],
      primary: false,
    },
    filter: {
      entityTypes: ["restaurant"],
      // savedFilterIds: [savedFilterId],
    },
  },
};

var url = ""; /** current detail page url */

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  if (!document.slug) {
    let slugString = document.id + " " + document.name;
    let slug = slugify(slugString);
    url = `${slug}.html`;
  } else {
    url = `${document.slug.toString()}.html`;
  }
  return url;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
  relativePrefixToRoot,
}): HeadConfig => {
  let metaDescription = document.c_metaDescription
    ? document.c_metaDescription
    : "Visit your " +
    document.name +
    " store for Britain's Tastiest Chicken. Find our menu, order delivery, and timings here.";
  let metaTitle = document.c_metaTitle
    ? document.c_metaTitle
    : "Visit " + document.name + " | Britain's Tastiest Chicken!";

  return {
    charset: "UTF-8",
    title: metaTitle,
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: favicon,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "description",
          content: `${metaDescription}`,
        },
      },

      {
        type: "meta",
        attributes: {
          name: "author",
          content: "FAVORITE CHICKEN & RIBS",
        },
      },
      {
        type: "meta",
        attributes: {
          name: "theme-color",
          content: "#232e7f",
        },
      },
      {
        type: "meta",
        attributes: {
          name: "robots",
          content: robotsMetaStatus,
        },
      },

      {
        type: "link",
        attributes: {
          rel: "canonical",
          href: `${document.c_canonical
            ? document.c_canonical
            : stagingBaseUrl + "/" + url
            }`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:url",
          content: stagingBaseUrl + "/" + url,
        },
      },

      {
        type: "meta",
        attributes: {
          property: "og:description",
          content: `${metaDescription}`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:title",
          content: `${metaTitle}`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:image",
          content: `${document.logo ? document.logo.image.url : ""}`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:card",
          content: "summary",
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:url",
          content: stagingBaseUrl + "/" + url,
        },
      },

      {
        type: "meta",
        attributes: {
          name: "twitter:description",
          content: metaDescription,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:image",
          content: `${document.logo ? document.logo.image.url : ""}`,
        },
      },

      {
        type: "script",
        attributes: {
          src: "https://www.googletagmanager.com/gtag/js?id=G-LJF9MNB79H",
          async: "async",
        },
      },
    ],
  };
};
type ExternalApiData = TemplateProps & { externalApiData: nearByLocation };
export const transformProps: TransformProps<ExternalApiData> = async (
  data: any
) => {
  const url = `${api_base_url}entities/geosearch?radius=${radius}&location=${data.document.yextDisplayCoordinate &&
    data.document.yextDisplayCoordinate.latitude
    },${data.document.yextDisplayCoordinate &&
    data.document.yextDisplayCoordinate.longitude
    }&api_key=${liveAPIKey}&v=20181201&resolvePlaceholders=true&entityTypes=${entityTypes}&distance=${radius}&limit=${limit}&fields=googlePlaceId,slug,address,addressHidden,hours,name,geocodedCoordinate,isoRegionCode,localPhone,mainPhone,timezone,yextDisplayCoordinate,meta,timeZoneUtcOffset,what3WordsAddress,closed`;
  const externalApiData = (await fetch(url)
    .then((res: any) => res.json())
    .catch((error: any) => { })) as nearByLocation;
  return { ...data, externalApiData };
};

type ExternalApiRenderData = TemplateRenderProps & {
  externalApiData: nearByLocation;
};

/**
 * location template for all entities , detail page
 * @param entities
 * @returns
 */

const Location: Template<ExternalApiRenderData> = ({
  relativePrefixToRoot,
  externalApiData,
  document,
  __meta,
  path,
}) => {
  const {
    name,
    c_cTAButton,
    c_tagline,
    c_backgroundImage,
    address,
    mainPhone,
    c_cTAButton2,
    c_deliveryServicesUberEatsForPages,
    c_deliveryServicesDeliverooForPages,
    c_deliveryServicesJustEatForPages,
    hours,
    deliveryHours,
    timezone,
    facebookPageUrl,
    instagramHandle,
    twitterHandle,
    c_tikTok,
    c_headingH2,
    c_ourFoods,
    c_bestSellingFavouriteFavorite,
    c_title,
    c_description2,
    c_backgroundImages,
    androidAppUrl,
    iosAppUrl,
    frequentlyAskedQuestions,
    what3WordsAddress,
    description,
    yextDisplayCoordinate,
    dm_directoryParents,
    slug,
    googlePlaceId,
    _site,
    additionalHoursText,
    c_abouttest,
    c_autogenerate
  } = document;

  let templateData = { document: document, __meta: __meta };
  let hoursSchema = [];
  let breadcrumbScheme = [];

  if (hours) {
    for (var key in hours) {
      if (hours.hasOwnProperty(key)) {
        let openIntervalsSchema: any = "";
        if (key !== "holidayHours") {
          if (hours[key].isClosed) {
            openIntervalsSchema = {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: key,
            };
          } else {
            let end = "";
            let start = "";
            if (typeof hours[key].openIntervals != "undefined") {
              let openIntervals = hours[key].openIntervals;
              for (var o in openIntervals) {
                if (openIntervals.hasOwnProperty(o)) {
                  end = openIntervals[o].end;
                  start = openIntervals[o].start;
                }
              }
            }
            openIntervalsSchema = {
              "@type": "OpeningHoursSpecification",
              closes: end,
              dayOfWeek: key,
              opens: start,
            };
          }
        } else {
        }

        hoursSchema.push(openIntervalsSchema);
      }
    }
  }

  dm_directoryParents &&
    dm_directoryParents.map((i: any, index: any) => {
      if (index != 0) {
        breadcrumbScheme.push({
          "@type": "ListItem",
          position: index,
          item: {
            "@id": `${stagingBaseUrl}/${i.slug}.html`,
            name: i.name,
          },
        });
      }
    });
  let url = "";
  let Name: any = document.name.toLowerCase().toString();
  Name = name.replace(/[&\/\\#^+()$~%.'":*?<>{}!@]/g, "");
  Name = Name.replaceAll("  ", "-");
  if (!document.slug) {
    url = `${document.id}-${Name}.html`;
  } else {
    url = `${document.slug.toString()}.html`;
  }
  breadcrumbScheme.push({
    "@type": "ListItem",
    position: 4,
    item: {
      "@id": `${stagingBaseUrl}/${url}`,
      name: document.name,
    },
  });

  if (googleAnalytics.trackingCode != "") {
    ReactGA.initialize(googleAnalytics.trackingCode);
    ReactGA.send("pageview");
  }

  let breadcrumbUrl = setUrl(dm_directoryParents);

  return (
    <>
      <JsonLd<Resturant>
        item={{
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: "Favorite Chicken & Ribs",
          description: description,
          telephone: document.mainPhone,
          image: stagingBaseUrl + Logo,
          address: {
            "@type": "PostalAddress",
            streetAddress: address.line1,
            addressLocality: address.city,
            addressRegion: address.region,
            postalCode: address.postalCode,
            addressCountry: address.countryCode,
          },
          openingHoursSpecification: hours ? hoursSchema : [],
        }}
      />
      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",

          itemListElement: breadcrumbScheme,
        }}
      />
      {frequentlyAskedQuestions ? (
        <>
          <JsonLd<FAQPage>
            item={{
              "@context": "https://schema.org",
              "@type": "FAQPage",

              mainEntity:
                frequentlyAskedQuestions &&
                frequentlyAskedQuestions.map((i: any) => {
                  return {
                    "@type": "Question",
                    name: i.question,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: `<p>${i.answer}</p>`,
                    },
                  };
                }),
            }}
          />
        </>
      ) : (
        <></>
      )}

      <JsonLd<Organization>
        item={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: OrganizationName,
          url: livSiteUrl,
          logo: OrganizationLogo,
          address: {
            "@type": OrganizationAddress.type,
            streetAddress: OrganizationAddress.streetAddress,
            addressLocality: OrganizationAddress.addressLocality,
            addressRegion: OrganizationAddress.addressRegion,
            postalCode: OrganizationAddress.postalCode,
            addressCountry: OrganizationAddress.addressCountry,
          },
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "contact",
            telephone: OrganizationTelephone,
          },
          sameAs: [
            OrganizationSocialMediaUrls.facebook,
            OrganizationSocialMediaUrls.instagram,
            OrganizationSocialMediaUrls.twitter,
          ],
        }}
      />
      <MyCustomScriptComponent />

      <AnalyticsProvider
        templateData={templateData}
        enableDebugging={AnalyticsEnableDebugging}
        enableTrackingCookie={AnalyticsEnableTrackingCookie}
      >
        {" "}
        <AnalyticsScopeProvider name={""}>
          <Header
            data={_site.c_headerLinks1}
            facebookPageUrl={_site.facebookPageUrl}
            instagramHandle={_site.instagramHandle}
            twitterHandle={_site.twitterHandle}
            c_tikTok={_site.c_tikTok}
            appStore={_site.c_appStore}
            playStore={_site.c_playStore}
          />
          {dm_directoryParents && (
            <BreadCrumbs
              name={name}
              parents={dm_directoryParents}
              address={address}
              breadcrumbUrl={breadcrumbUrl}
            />
          )}

          <Banner
            Name={name}
            TagLine={c_tagline}
            BackgroundImage={c_backgroundImage ? c_backgroundImage.url : bannerImage}
            CtaButton={c_cTAButton}
            template={"location"} text={undefined} />
          <LocationInformation
            prop={hours}
            deliveryHours={deliveryHours}
            coords={yextDisplayCoordinate}
            address={address}
            phone={mainPhone}
            c_cTAButton2={c_cTAButton2}
            c_deliveryServicesJustEatForPages={
              c_deliveryServicesJustEatForPages
            }
            c_deliveryServicesUberEatsForPages={
              c_deliveryServicesUberEatsForPages
            }
            c_deliveryServicesDeliverooForPages={
              c_deliveryServicesDeliverooForPages
            }
            facebookPageUrl={facebookPageUrl}
            instagramHandle={instagramHandle}
            twitterHandle={twitterHandle}
            c_tikTok={c_tikTok}
            what3WordsAddress={what3WordsAddress}
            timezone={timezone}
            name={name}
            googlePlaceId={googlePlaceId}
            additionalHoursText={additionalHoursText}
          />
          {description && c_headingH2 ? (
            <Card prop1={c_headingH2} prop2={c_autogenerate} />
          ) : (
            <></>
          )}
          {c_ourFoods ? <List prop={c_ourFoods} props1={c_cTAButton} /> : <></>}
          {c_bestSellingFavouriteFavorite ? (
            <FavoriteFood prop={c_bestSellingFavouriteFavorite} props1={c_cTAButton} />
          ) : (
            <></>
          )}
          {c_title || c_description2 || androidAppUrl || iosAppUrl ? (
            <AddPromotion
              c_title={c_title}
              c_description1={c_description2}
              c_backgroundImages={c_backgroundImages}
              androidAppUrl={androidAppUrl}
              iosAppUrl={iosAppUrl}
            />
          ) : (
            <></>
          )}
          {frequentlyAskedQuestions ? (
            <Faq prop={frequentlyAskedQuestions} />
          ) : (
            <></>
          )}
          <NearByLocation
            prop={externalApiData}
            parents={dm_directoryParents}
            baseUrl={relativePrefixToRoot}
            coords={yextDisplayCoordinate}
            slug={slug}
            what3WordsAddress={what3WordsAddress} />


          <Footer
            data={_site.c_footerLinks}
            address={_site.address}
            c_companyrn={_site.c_companyrn}
            c_phoneNumber={_site.c_phoneNumber}
            facebookPageUrl={_site.facebookPageUrl}
            instagramHandle={_site.instagramHandle}
            twitterHandle={_site.twitterHandle}
            c_tikTok={_site.c_tikTok}
            newsLetter={newsLetter}
          />
        </AnalyticsScopeProvider>
      </AnalyticsProvider>
    </>
  );
};

export default Location;
