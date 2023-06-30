import { useNavigate, useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import Advert from "./Advert";
import { useCallback } from "react";
import { getAdvert, deleteAdvert } from "./service";
import useMutation from "../../hooks/useMutation";
import useQuery from "../../hooks/useQuery";

const AdvertPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const mutation = useMutation(deleteAdvert);
  const getAdvertById = useCallback(
    () => getAdvert(params.advertId),
    [params.advertId]
  );
  const { isLoading, data: advert } = useQuery(getAdvertById);
  const isDetail = true;

  const handleDelete = () => {
    mutation.execute(params.advertId).then(() => navigate("/"));
  };

  return (
    <Layout title="Detalle de anuncio">
      <Advert
        onDelete={handleDelete}
        isLoading={mutation.isLoading}
        isDetail={isDetail}
        {...advert}
      />
    </Layout>
  );
};

export default AdvertPage;
