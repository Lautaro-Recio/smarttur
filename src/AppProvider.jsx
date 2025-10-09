import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase"; // Asegúrate de importar correctamente tu configuración de Firebase y funciones de Firestore

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [elementos, setElementos] = useState([]);
  const [galery, setGalery] = useState([]);
  const [title, setTitle] = useState("");
  const [parraf, setParraf] = useState("");
  const [price, setPrice] = useState(0);
  const [offerPrice, setOfferPrice] = useState(0);
  const [categoryBd, setCategoryBD] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "experiencias"),
      (snapshot) => {
        const updatedElementos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setElementos(updatedElementos); // Actualizar estado con los elementos actualizados
      },
      (error) => {
        console.error("Error al obtener elementos en tiempo real:", error);
      }
    );

    return () => unsubscribe(); // Limpieza al desmontar el componente
  }, []);

  const contextValue = {
    elementos,
    setGalery,
    galery,
    setTitle,
    title,
    setParraf,
    parraf,
    setPrice,
    price,
    setOfferPrice,
    offerPrice,
    setCategoryBD,
    categoryBd,
    setPdfUrl,
    pdfUrl
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validación de children como un nodo React requerido
};

export default AppProvider;
