import { memo, useCallback, useMemo, useState } from "react";
import Layout from "../layout/Layout";
import Button from "../shared/Button";

import "./NewAdvertPage.css";
import { createAdvert } from "./service";
import { useNavigate } from "react-router-dom";

const NewAdvertPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [advertName, setAdvertName] = useState("");
  const [advertSale, setAdvertSale] = useState(false);
  const [advertPrice, setAdvertPrice] = useState(0);
  const [advertTags, setAdvertTags] = useState([]);
  const [advertPictures, setAdvertPictures] = useState(null);

  const handleNameChange = (event) => {
    setAdvertName(event.target.value);
  };
  const handleSaleChange = (event) => {
    let value = event.target.value;
    value = value === "Venta" ? true : false;
    setAdvertSale(event.target.value);
  };
  const handlePriceChange = (event) => {
    setAdvertPrice(event.target.value);
  };
  const handleTagsChange = (event) => {
    setAdvertTags(event.target.value);
  };
  const handlePicturesChange = (event) => {
    console.log(event.target.files[0]);
    setAdvertPictures(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", advertName);
      formData.append("sale", advertSale);
      formData.append("price", advertPrice);
      formData.append("tags", advertTags);
      if (advertPictures) {
        formData.append("photo", advertPictures);
      }
      const advert = await createAdvert(formData);
      setIsLoading(false);
      navigate(`/adverts/${advert.id}`);
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
    }
  };

  const isDisabled =
    isLoading ||
    !advertName.length ||
    advertPrice === 0 ||
    !advertTags.length ||
    !advertSale;

  const objProperty = useMemo(() => {
    return { isLoading };
  }, [isLoading]);

  const funcProperty = useCallback(() => {
    console.log("isLoading", isLoading);
  }, [isLoading]);

  return (
    <Layout title="Crea un nuevo anuncio">
      <div className="newAdvertPage bordered">
        <div className="right">
          <h3>Sube tu producto</h3>
          <br></br>
          <form onSubmit={handleSubmit}>
            <div>
              <span>Nombre </span>
              <input
                label="Nombre"
                type="text"
                style={{ borderWidth: 1 }}
                value={advertName}
                onChange={handleNameChange}
                required
              />
              <div></div>
              <br></br>
              <span>Precio </span>
              <input
                label="Precio"
                type="number"
                style={{ borderWidth: 1 }}
                value={advertPrice}
                onChange={handlePriceChange}
                required
              />
              <div>
                <br></br>
                <span>Tags </span>
                <input
                  label="Tags"
                  type="text"
                  style={{ borderWidth: 1 }}
                  value={advertTags}
                  onChange={handleTagsChange}
                  required
                />
              </div>
              <div>
                <br></br>
                <span>Subir fotos </span>
                <input
                  label="Picture"
                  type="file"
                  name="files"
                  multiple
                  onChange={handlePicturesChange}
                />
              </div>
              <br></br>
              Tipo de anuncio <span></span>
              <label>
                <input
                  type="radio"
                  value="Venta"
                  checked={advertSale === "Venta"}
                  onChange={handleSaleChange}
                  required
                />
                Venta
              </label>
              <span> </span>
              <label>
                <input
                  type="radio"
                  value="Compra"
                  checked={advertSale === "Compra"}
                  onChange={handleSaleChange}
                  required
                />
                Compra
              </label>
            </div>

            <div className="newAdvertPage-footer">
              <Button
                type="submit"
                className="newAdvertPage-submit"
                variant="primary"
                disabled={isDisabled}
              >
                Subir Anuncio
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewAdvertPage;
