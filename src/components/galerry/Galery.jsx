import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppProvider";
import "./Galery.css";
import { Link, useNavigate, useParams } from "react-router-dom";

function Galery() {
  const { elementos, galery, title, parraf, offerPrice, price, categoryBd, pdfUrl } =
    useContext(AppContext);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleGoBack = () => {
    navigate(-1); // Navega a la página anterior
  };

  // Función para formatear precios, asegurando que estén definidos
  const formatPrice = (price) => {
    if (price === undefined || price === null) return "N/A";
    return `$${parseFloat(price).toLocaleString("de-DE")}`;
  };

  const message = `Hola! Queria obtener mas informacion sobre el paquete ${categoryBd + " " + title
    }`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/5493515184315?text=${encodedMessage}`;

  useEffect(() => {
    // Intentar resolver por ID desde elementos (fuente de verdad)
    if (id && Array.isArray(elementos) && elementos.length > 0) {
      const exp = elementos.find((e) => e.id === id);
      if (exp) {
        const resolved = {
          galery: exp.images || [],
          title: exp.name || "",
          parraf: exp.text || "",
          offerPrice: exp.priceOff ?? 0,
          price: exp.price ?? 0,
          categoryBd: exp.category || "",
          pdfUrl: exp.pdfUrl || "",
        };
        setData(resolved);
        localStorage.setItem(`galeryData:${id}`, JSON.stringify(resolved));
        return;
      }
    }

    // Si no está resuelto por ID aún (por ejemplo, en refresh antes de cargar elementos), usar contexto si completo
    if (
      galery && title && parraf &&
      offerPrice !== undefined && price !== undefined && categoryBd
    ) {
      const contextData = { galery, title, parraf, offerPrice, price, categoryBd, pdfUrl };
      setData(contextData);
      if (id) localStorage.setItem(`galeryData:${id}`, JSON.stringify(contextData));
      return;
    }

    // Fallback final: localStorage por ID
    if (id) {
      const stored = localStorage.getItem(`galeryData:${id}`);
      if (stored) {
        try { setData(JSON.parse(stored)); } catch { }
      }
    }
  }, [id, elementos, galery, title, parraf, offerPrice, price, categoryBd, pdfUrl]);

  if (!data) return <div>Loading...</div>; // Manejo de carga
  console.log('data ======> ', data)
  return (
    <div className="galeryBody">
      <button
        onClick={handleGoBack}
        className="back-button"
        aria-label="Volver atrás"
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          background: 'rgba(255, 255, 255, 0.8)',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          zIndex: 1000,
          transition: 'background 0.3s ease'
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#333"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <div className="containerWave">
        <div className="">
          <h1 className="center white">{data.categoryBd + " " + data.title}</h1>
          <div className="galery center">
            {data.galery.map((item) => (
              <Link key={item.id} to={`galery/${data.title}`}>
                <span>
                  <p>Ir a la Galeria</p>
                </span>
                <img
                  src={item.url}
                  alt={item.nameOfImage || "Imagen de la galería"}
                />
              </Link>
            ))}
          </div>

          <h3 className="center ">Información</h3>
          <div className="informacion">
            <p className=" parraf">{data.parraf}</p>
            <div>

              <div className="flex">
                {(data.price !== null && data.price !== 0) ? (

                  <p className={`titles ${(data.price !== null && data.price !== 0 && data.price < data.price) && "tached"}`}>
                    Precio regular {formatPrice(data.price)}
                  </p>
                ) : null}
                {(data.offerPrice !== null && data.offerPrice !== 0 && data.offerPrice < data.price) ? (
                  <p className="titles mx-5">
                    Precio Oferta {formatPrice(data.offerPrice)}
                  </p>
                ) : null}

              </div>

              <div className="center">
                {data.pdfUrl && (

                  <a
                    href={data.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ height: "40px", width: "150px", marginTop: "10px" }}
                    title="Ver tarifario (PDF)"
                  >
                    <i className="bi bi-file-earmark-pdf me-1"></i> Ver tarifario
                  </a>
                )}
              </div>
              <div className="flotantButton">
                <a
                  type="button"
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ion-icon size="large" name="logo-whatsapp"></ion-icon>
                </a>
              </div>
            </div>
          </div>

        </div>
        {/* Aquí podrías incluir un elemento adicional si es necesario, como una ola o algo similar */}
        <div className="wave"></div>
      </div>
    </div>
  );
}

export default Galery;
