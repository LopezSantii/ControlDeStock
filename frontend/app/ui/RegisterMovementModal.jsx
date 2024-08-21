"use client";

import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalFooter,
  Input,
  Button,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { useState } from "react";
import { addMovement } from "../../js/services";

export default function RegisterMovementModal({
  open,
  close,
  productos,
  handleMovementAdded,
}) {
  const [producto, setProducto] = useState({
    producto_id: "",
    tipo: "",
    cantidad: 0,
  });

  const handleFormSubmit = async () => {
    const addedNewMovement = await addMovement(producto);
    if (addedNewMovement) {
      handleMovementAdded(producto);
      setProducto({
        producto_id: "",
        tipo: "",
        cantidad: 0,
      });
      close();
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
          Registrar Movimientos
        </ModalHeader>
        <ModalBody>
          <Autocomplete
            aria-label="Autocomplete de productos"
            color="secondary"
            label="Seleccione el item"
            onSelectionChange={(value) =>
              setProducto({ ...producto, producto_id: value })
            }
          >
            {productos.map((producto) => (
              <AutocompleteItem
                value={producto.id}
                key={producto.id}
                textValue={producto.nombre}
              >
                {producto.nombre}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <Autocomplete
            aria-label="Autocomplete de Movimientos de stock"
            color="secondary"
            label="Seleccione el Movimiento"
            onSelectionChange={(value) =>
              setProducto({ ...producto, tipo: value })
            }
          >
            <AutocompleteItem key="entrada" textValue="Entrada">
              Entrada
            </AutocompleteItem>
            <AutocompleteItem key="salida" textValue="Salida">
              Salida
            </AutocompleteItem>
          </Autocomplete>
          <Input
            color="secondary"
            label="Cantidad"
            type="number"
            onChange={(e) =>
              setProducto({ ...producto, cantidad: e.target.value })
            }
            required
          />
        </ModalBody>
        <ModalFooter>
          <Button
            className="w-full"
            color="secondary"
            onClick={handleFormSubmit}
          >
            Agregar Movimiento
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
