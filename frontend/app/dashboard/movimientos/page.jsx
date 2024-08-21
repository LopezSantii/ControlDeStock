"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DateRangePicker,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { SearchIcon, FilterIcon, MovementIcon } from "../../ui/Icons";
import TableOfMovements from "../../ui/TableOfMovements";
import RegisterMovementModal from "../../ui/RegisterMovementModal";
import { fetchMovements, fetchProducts } from "../../../js/services";
import { filterMovementsByDate } from "../../../js/utils";

function Page() {
  const [movements, setMovements] = useState([]);
  const [products, setProducts] = useState([]);
  const [dateRange, setDateRange] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(() => {
    fetchMovements()
      .then((data) => setMovements(data))
      .catch((error) => console.error(error));

    fetchProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);
  const handleMovementAdded = (newMovement) => {
    setMovements([...movements, newMovement]);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const filteredMovements = useMemo(() => {
    const movementsByDate = filterMovementsByDate(movements, dateRange);
    if (!selectedProduct) {
      return movementsByDate;
    }
    return movementsByDate.filter(
      (movement) => movement.producto_id === parseInt(selectedProduct)
    );
  }, [movements, dateRange, selectedProduct]);

  return (
    <div>
      <div className="flex flex-col gap-4 xl:flex-row items-center justify-between mb-3">
        <h1 className="text-3xl">Movimientos de Stock</h1>
        <div className="flex flex-row gap-4">
          <Dropdown backdrop="blur" closeOnSelect={false}>
            <DropdownTrigger>
              <Button color="secondary" variant="shadow">
                <FilterIcon />
                Filtros
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem>
                <Autocomplete
                  color="secondary"
                  label="Nombre"
                  type="text"
                  onSelectionChange={(e) => {
                    setSelectedProduct(e);
                  }}
                  startContent={<SearchIcon />}
                >
                  {products.map((producto) => (
                    <AutocompleteItem
                      value={producto.id}
                      key={producto.id}
                      textValue={producto.nombre}
                    >
                      {producto.nombre}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
              </DropdownItem>
              <DropdownItem>
                <DateRangePicker
                  onChange={(e) => setDateRange(e)}
                  color="secondary"
                  label="Fecha"
                />
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Button variant="shadow" color="secondary" onClick={openModal}>
            <MovementIcon />
            Registrar Movimiento
          </Button>
        </div>
      </div>
      <TableOfMovements
        setMovements={setMovements}
        movements={filteredMovements}
      />
      <RegisterMovementModal
        handleMovementAdded={handleMovementAdded}
        productos={products}
        open={isModalOpen}
        close={closeModal}
      />
    </div>
  );
}

export default Page;
