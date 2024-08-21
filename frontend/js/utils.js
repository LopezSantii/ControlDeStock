import Toastify from "toastify-js";
import { deleteProduct, deleteMovement } from "./services";
import "toastify-js/src/toastify.css";

// Validaciones
export const validateProduct = (producto) => {
  if (
    !producto.nombre ||
    !producto.descripcion ||
    producto.precio <= 0 ||
    producto.cantidad <= 0
  ) {
    Toastify({
      text: "Por favor, complete todos los campos correctamente.",
      duration: 800,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "rgb(147 51 234)",
      },
    }).showToast();
    return false;
  }
  return true;
};

export const handleDelete = async (productid, setProductos, productos) => {
  try {
    await deleteProduct(productid);
    setProductos(productos.filter((producto) => producto.id !== productid));
    Toastify({
      text: "Producto eliminado",
      duration: 800,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "rgb(147 51 234)",
      },
    }).showToast();
  } catch (error) {
    console.error(error);
  }
};

export const handleDeleteMovement = async (
  movementid,
  setMovement,
  movements
) => {
  try {
    await deleteMovement(movementid);
    setMovement(movements.filter((producto) => producto.id !== movementid));
    Toastify({
      text: "Movimiento eliminado",
      duration: 800,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "rgb(147 51 234)",
      },
    }).showToast();
  } catch (error) {
    console.error(error);
  }
};

export const checkProductExists = (producto, productos) => {
  const exists = productos.some((prod) => prod.nombre === producto.nombre);

  if (exists) {
    Toastify({
      text: "El producto ya está registrado.",
      duration: 800,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "rgb(147 51 234)",
      },
    }).showToast();
    return true;
  }

  return false;
};

export const validateMovement = (producto_id, cantidad) => {
  if (!producto_id || !cantidad) {
    Toastify({
      text: "Por favor, completa todos los campos.",
      duration: 800,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "rgb(147 51 234)",
      },
    }).showToast();
    return false;
  }
  return true;
};

// Utilidades

// Paginacion

// Calcula la cant de paginas
const rowsPerPage = 16;

export const calculatePages = (productos) => {
  return Math.ceil(productos.length / rowsPerPage);
};
// Calcula los productos a mostrar en la página actual
export const GetcurrentProducts = (page, productos) => {
  const currentProducts = productos.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return currentProducts;
};

// Setear Datos
export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

// filtro de fecha
export function filterMovementsByDate(movements, dateRange) {
  const convertToDate = (dateObj) => {
    return new Date(dateObj.year, dateObj.month - 1, dateObj.day);
  };

  if (!dateRange || !dateRange.start || !dateRange.end) {
    return movements;
  }

  const startDate = convertToDate(dateRange.start);
  const endDate = convertToDate(dateRange.end);
  endDate.setDate(endDate.getDate() + 1);

  return movements.filter((movement) => {
    const movementDate = new Date(movement.fecha);
    return movementDate >= startDate && movementDate < endDate;
  });
}

export function convertToDate(dateObj) {
  return new Date(dateObj.year, dateObj.month - 1, dateObj.day);
}
