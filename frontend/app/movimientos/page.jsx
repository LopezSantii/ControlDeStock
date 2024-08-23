"use client";

import { useState, useMemo } from "react";
import { Button } from "@nextui-org/react";
import Filter from "../ui/Filter";
import { MovementIcon } from "../ui/Icons";
import TableOfMovements from "../ui/TableOfMovements";
import RegisterMovementModal from "../ui/RegisterMovementModal";
import { filterMovementsByDate } from "../../js/utils";
import { useData } from "../context/DataContext";

function Page() {
  const { movements, setMovements, products, setRender } = useData();
  const [dateRange, setDateRange] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
          <Filter
            products={products}
            setDateRange={setDateRange}
            setSelectedProduct={setSelectedProduct}
          />
          <Button variant="flat" color="secondary" onClick={openModal}>
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
        setRender={setRender}
        movements={movements}
        setMovements={setMovements}
        productos={products}
        open={isModalOpen}
        close={closeModal}
      />
    </div>
  );
}

export default Page;
