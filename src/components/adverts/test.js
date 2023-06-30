import { useEffect, useState } from "react";
import { getLatestAdverts } from "./service";
import Button from "../shared/Button";
import Layout from "../layout/Layout";
import Advert from "./Advert";
import { Link } from "react-router-dom";
import { useRef } from "react";


const EmptyList = () => (
  <div style={{ textAlign: "center" }}>
    <p>Sé el primero!</p>
    <Button as={Link} variant="primary" to="/adverts/new">
      Crea tu anuncio
    </Button>
  </div>
);

const AdvertsPage = () => {
  const isMounted = useRef(false);

  const [queryName, setQueryName] = useState("");
  const [querySale, setQuerySale] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [adverts, setAdverts] = useState([]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const adverts = await getLatestAdverts();

      setAdverts(adverts);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  const filteredAdverts = adverts.filter(
    (advert) =>
      (advert.name ?? "").toUpperCase().startsWith(queryName.toUpperCase()) &&
      (advert.sale ? "Venta" : "Compra" ?? "")
        .toUpperCase()
        .startsWith(querySale.toUpperCase())
  );

  return (
    <Layout title="Últimos anuncios">
      {isLoading ? (
        <div>Cargando anuncios...</div>
      ) : (
        <div>
          {!!adverts.length ? (
            <>
              <div>
                <label>
                  <strong>Filtros:</strong>{" "}
                  <div>
                    <span>Nombre </span>
                    <input
                      label="Nombre"
                      type="text"
                      style={{ borderWidth: 1 }}
                      value={queryName}
                      onChange={(event) => setQueryName(event.target.value)}
                    />
                    <div>
                      <span>Tipo de anuncio </span>
                      <input
                        label="Tipo de anuncio"
                        type="text"
                        placeholder="Venta/Compra"
                        style={{ borderWidth: 1 }}
                        value={querySale}
                        onChange={(event) => setQuerySale(event.target.value)}
                      />
                    </div>
                  </div>
                </label>
              </div>
              <ul>
                {filteredAdverts.map((advert) => (
                  <li key={advert.id}>
                    <Link to={`/adverts/${advert.id}`}>
                      <Advert {...advert} />
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <EmptyList />
          )}
        </div>
      )}
    </Layout>
  );
};

export default AdvertsPage;
