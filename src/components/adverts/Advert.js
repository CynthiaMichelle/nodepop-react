import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { ConfirmationButton } from "../common";
import Photo from "../shared/Photo";
import placeholder from "../../assets/placeholder.png";
import "./Advert.css";

const Advert = ({ name, sale, createdAt, price, tags, photo, isDetail, onDelete, isLoading }) => {
  sale = sale ? "Venta" : "Compra";
  price = String(price) + "€";

  const deleteButton = () => {
    return isDetail ? (
      <ConfirmationButton
        confirmation="Are you sure?"
        onConfirm={onDelete}
        disabled={isLoading}
      >
        Delete
      </ConfirmationButton>
    ) : (
      <span></span>
    )
  };

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
        <div>
        <img src={photo || placeholder} style={{ width: "400px" }}></img>
        </div>
        <div>
        {deleteButton()}
        </div>
      </div>
    </article>
  );
};

export default Advert;
