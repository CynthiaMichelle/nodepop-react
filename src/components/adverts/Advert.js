import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import Photo from "../shared/Photo";
import "./Advert.css";

const Advert = ({ name, sale, createdAt, price, tags, photo }) => {
  sale = sale ? "Venta" : "Compra";
  price = String(price) + "€";

  return (
    <article className="advert bordered">
      <div className="left">
        <Photo className="advert-photo" />
      </div>
      <div className="right">
        <div className="advert-header">
          <span>{name}</span>
          <span className="advert-separator">·</span>
          {createdAt ? (
            <time dateTime={createdAt}>
              {formatDistanceToNow(new Date(createdAt))}
            </time>
          ) : null}
        </div>
        <div>
          <span>{price}</span>
          <span className="advert-separator">·</span>
          <span>{sale}</span>
        </div>
        <div>
          Tags: <span>{tags}</span>
        </div>
        <img src={photo}></img>
      </div>
    </article>
  );
};

export default Advert;
