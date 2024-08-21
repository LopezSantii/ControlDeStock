"use client";

import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalFooter,
  Input,
  Button,
} from "@nextui-org/react";
import { addProduct } from "../../js/services";
import { fetchProducts } from "../../js/services";
import { useState, useEffect } from "react";

export default function NewProductModal({ open, close, setRender }) {
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    fetchProducts()
      .then((data) => setProductos(data))
      .catch((error) => console.error(error));
  }, []);
  // Estado del nuevo producto
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    cantidad: 0,
  });

  const handleAddProduct = async () => {
    try {
      const addedProduct = await addProduct(nuevoProducto, productos);
      if (addedProduct) {
        setProductos(...productos, addedProduct);
        setNuevoProducto({
          nombre: "",
          descripcion: "",
          precio: 0,
          cantidad: 0,
        });
        close(); // Cerrar el modal después de agregar el producto
      }
      setRender(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      classNames={{
        backdrop: "bg-[#292f46]/70 backdrop-opacity-40",
      }}
      isOpen={open}
      onClose={close}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Agregar nuevo producto
        </ModalHeader>
        <ModalBody>
          <Input
            color="secondary"
            label="Nombre"
            type="text"
            value={nuevoProducto.nombre}
            onChange={(e) =>
              setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })
            }
          />
          <Input
            color="secondary"
            label="Descripción"
            type="text"
            value={nuevoProducto.descripcion}
            onChange={(e) =>
              setNuevoProducto({
                ...nuevoProducto,
                descripcion: e.target.value,
              })
            }
          />
          <Input
            color="secondary"
            type="number"
            label="Precio"
            onChange={(e) =>
              setNuevoProducto({
                ...nuevoProducto,
                precio: Number(e.target.value),
              })
            }
          />
          <Input
            color="secondary"
            label="Cantidad"
            type="number"
            onChange={(e) =>
              setNuevoProducto({
                ...nuevoProducto,
                cantidad: Number(e.target.value),
              })
            }
            required
          />
        </ModalBody>
        <ModalFooter>
          <Button
            className="w-full"
            color="secondary"
            onClick={handleAddProduct}
          >
            Agregar Producto
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
