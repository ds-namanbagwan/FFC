import {
  api_base_url,
  radius,
  liveAPIKey,
  entityTypes,
  savedFilterId,
  limit,
} from "../constants";

var WebApi = {
  getRequest: function (entities: any) {
    const url = `${api_base_url}entities/geosearch?radius=${radius}&location=${
      entities && entities.latitude
    },${
      entities && entities.longitude
    }&api_key=${liveAPIKey}&v=20181201&resolvePlaceholders=true&entityTypes=${entityTypes}&savedFilterId=${savedFilterId}&limit=${limit}&fields=googlePlaceId,slug,address,addressHidden,hours,name,geocodedCoordinate,isoRegionCode,localPhone,mainPhone,timezone,yextDisplayCoordinate,meta,timeZoneUtcOffset,what3WordsAddress,closed`;
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        return data.response.entities;
      })
      .catch((error) => {});
  },
};

export default WebApi;
export function setUrl(parents: any) {
  let data = [];
  if (parents) {
    for (let i = 0; i < parents.length; i++) {
      if (parents[i].meta.entityType.id == "ce_country") {
        parents[i].name = parents[i].name;
        parents[i].slug = parents[i].slug;
        data.push({
          name: parents[i].name,
          slug: parents[i].slug,
        });
      } else if (parents[i].meta.entityType.id == "ce_region") {
        data.push({ name: parents[i].name, slug: parents[i].slug });
        parents[i].name = parents[i].name;
        parents[i].slug = `${parents[i].slug}`;
      } else if (parents[i].meta.entityType.id == "ce_city") {
        parents[i].name = parents[i].name;
        parents[i].slug = `${parents[i].slug}`;
        data.push({
          name: parents[i].name,
          slug: parents[i].slug,
        });
      }
    }

    return data;
  }
}
