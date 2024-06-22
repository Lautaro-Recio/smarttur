import { createContext, useState } from 'react';

// Creamos el contexto
export const AppContext = createContext();

// Componente proveedor del contexto
// eslint-disable-next-line react/prop-types
const AppProvider = ({ children }) => {
    
  // Estado inicial
  const [state, setState] = useState({
    message: 'Hola desde el contexto',
    counter: 0,
  });

  // Función para modificar el estado
  const incrementCounter = () => {
    setState(prevState => ({
      ...prevState,
      counter: prevState.counter + 1,
    }));
  };

  // Valor del contexto que se pasa a los componentes hijos
  const contextValue = {
    state,
    incrementCounter,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
