"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchMovements, fetchProducts } from "../../js/services";

// Crear el contexto
const DataContext = createContext();

// Crear un hook personalizado para usar el contexto más fácilmente
export const useData = () => useContext(DataContext);

// Proveedor del contexto
export const DataProvider = ({ children }) => {
  const [movements, setMovements] = useState([]);
  const [products, setProducts] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    fetchMovements()
      .then((data) => setMovements(data))
      .catch((error) => console.error(error));

    fetchProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error(error));
    setRender(false);
  }, [render]);

  return (
    <DataContext.Provider
      value={{ movements, setMovements, products, setProducts, setRender }}
    >
      {children}
    </DataContext.Provider>
  );
};
