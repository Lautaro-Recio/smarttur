import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [elementos, setElementos] = useState([]);
  
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
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validación de children como un nodo React requerido
};

export default AppProvider;
