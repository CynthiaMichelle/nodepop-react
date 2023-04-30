import { useNavigate, useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import Advert from "./Advert";
import { useEffect, useState } from "react";
import { getAdvert } from "./service";

const AdvertPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [advert, setAdvert] = useState(null);

  useEffect(() => {
    getAdvert(params.advertId)
      .then((advert) => setAdvert(advert))
      .catch((error) => {
        if (error.status === 404) {
          return navigate("/404");
        }
        setError(error);
      });
  }, [params.advertId, navigate]);

  return (
    <Layout title="Detalle de anuncio">
      <Advert {...advert} />
    </Layout>
  );
};

export default AdvertPage;
