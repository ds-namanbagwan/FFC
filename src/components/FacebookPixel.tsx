import * as React from "react";

import { useState, useRef, useEffect, memo } from "react";

const FacebookPixel = ({}) => {
  let data = "";
  data = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-Q0G8Z8S78C');
  !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '409877376872279');
    fbq('track', 'PageView');`;
  function htmlDecode(html: any) {
    return html.replace(/&([a-z]+);/gi, (match: any, entity: any) => {
      const entities: any = {
        amp: "&",
        apos: "'",
        gt: ">",
        lt: "<",
        nbsp: "\xa0",
        quot: '"',
      };
      //   entity = entity.toLowerCase();
      if (entities.hasOwnProperty(entity)) {
        return entities[entity];
      }
      return match;
    });
  }
  return (
    <script
      id="facebook-pixel"
      dangerouslySetInnerHTML={{ __html: htmlDecode(data) }}
    />
  );
};
export default FacebookPixel;
