import axios from "axios";
import {
  validateProduct,
  checkProductExists,
  validateMovement,
  capitalizeFirstLetter,
} from "./utils";

const API_URL_STOCK = "http://localhost:3001/api/products";

// Traer Stock
export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL_STOCK);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Agregar Nuevo Producto
export const addProduct = async (nuevoProducto, productos) => {
  nuevoProducto.nombre = capitalizeFirstLetter(nuevoProducto.nombre.trim());
  nuevoProducto.descripcion = capitalizeFirstLetter(
    nuevoProducto.descripcion.trim()
  );
  if (!validateProduct(nuevoProducto)) {
    return;
  }
  if (checkProductExists(nuevoProducto, productos)) {
    return;
  }
  try {
    const response = await axios.post(API_URL_STOCK, nuevoProducto);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// Eliminar producto
export const deleteProduct = async (productId) => {
  try {
    await axios.delete(`${API_URL_STOCK}`, {
      data: { productId },
    });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
};

// Traer Movimientos de Stock
export const fetchMovements = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3001/api/stock-movements"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching movements:", error);
    throw error;
  }
};

// Registrar Movimiento
export const addMovement = async (nuevoMovimiento) => {
  if (
    !validateMovement(nuevoMovimiento.producto_id, nuevoMovimiento.cantidad)
  ) {
    return;
  }
  try {
    const response = await axios.post(
      "http://localhost:3001/api/stock-movement",
      nuevoMovimiento
    );
    return response.data;
  } catch (error) {
    console.error("Error adding movement:", error);
    throw error;
  }
};

// Eliminar movimiento
export const deleteMovement = async (movementid) => {
  try {
    await axios.delete("http://localhost:3001/api/stock-movements", {
      data: { movementid },
    });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
};
