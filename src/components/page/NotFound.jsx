import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./page.css";

// Estilos en línea para la página 404
const pageStyles = {
  notFoundContainer: {
    minHeight: '100vh',
    backgroundImage: 'url("https://images.unsplash.com/photo-1542272201-b1ca555b5800?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  content: {
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
    color: 'white',
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    fontSize: '6rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  },
  subtitle: {
    fontSize: '2rem',
    marginBottom: '2rem',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
  },
  message: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    lineHeight: '1.6',
  },
  button: {
    padding: '0.8rem 2rem',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    borderRadius: '30px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
};

function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  // Efecto para asegurar que la página se desplace al inicio
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={pageStyles.notFoundContainer}>
      <div style={pageStyles.overlay}></div>
      <div style={pageStyles.content}>
        <h1 style={pageStyles.title}>404</h1>
        <h2 style={pageStyles.subtitle}>¡Oh no! Te perdiste en medio del viaje</h2>
        <p style={pageStyles.message}>
          Este destino no aparece en ningún mapa conocido.
          <br />
          Sigamos la brújula de regreso a casa.
        </p>
        <Button
          variant="light"
          size="lg"
          onClick={handleGoHome}
          style={pageStyles.button}
          className="mt-3"
        >
          Volver al inicio
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
