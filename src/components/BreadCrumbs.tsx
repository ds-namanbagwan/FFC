import * as React from "react";
import { livSiteUrl, stagingBaseUrl } from "../constants";
import { svgIcons } from "../svgIcon";
import { Link } from "@yext/pages/components";
import gaEvent from "../GTAEvents";
type data = {
  name: any;
  parents: any;
  address: any;
  breadcrumbUrl: any;
};

const BreadCrumbs = (props: data) => {
  return (
    <div className="breadcrumb">
      <div className="container">
        <ul>
          <li>
            <a href={livSiteUrl}>{svgIcons.homeIcon}</a>
          </li>

          {props.breadcrumbUrl &&
            props.breadcrumbUrl.map((crumb: any, index: any) => {
              return (
                <li key={crumb.slug}>
                  <Link
                    href={`${stagingBaseUrl}/${crumb.slug}.html`}
                    rel="noopener noreferrer"
                    eventName={"BreadCrumbs" + (index + 1)}
                    onClick={() =>
                      gaEvent(
                        "Restaurant",
                        "BreadCrumbs" + (index + 1),
                        crumb.name,
                        1
                      )
                    }
                  >
                    {crumb.name}
                  </Link>
                </li>
              );
            })}
          <li>{props && props.name}</li>
        </ul>
      </div>
    </div>
  );
};

export default BreadCrumbs;
