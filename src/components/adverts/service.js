import client from "../../api/client";

const adverstUrl = "/api/v1/adverts";

export const getLatestAdverts = () => {
  const url = `${adverstUrl}`;
  return client.get(url);
};

export const getAdvert = (advertId) => {
  const url = `${adverstUrl}/${advertId}`;
  return client.get(url);
};

export const createAdvert = (advert) => {
  const url = `${adverstUrl}`;
  return client.post(url, advert, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
