import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { TrashIcon } from "./Icons";
import { useState, useMemo } from "react";
import {
  calculatePages,
  GetcurrentProducts,
  handleDeleteMovement,
} from "../../js/utils";

export default function TableOfMovements({ movements, setMovements }) {
  const [page, setPage] = useState(1);
  const pages = useMemo(() => calculatePages(movements), [movements]);

  const sortedMovements = useMemo(
    () => [...movements].sort((a, b) => new Date(b.fecha) - new Date(a.fecha)),
    [movements]
  );

  const currentProducts = useMemo(
    () => GetcurrentProducts(page, sortedMovements),
    [page, sortedMovements]
  );

  return (
    <Table
      aria-label="Tabla de movimientos de stock"
      shadow="md"
      isHeaderSticky="true"
      color="secondary"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
    >
      <TableHeader>
        <TableColumn>Codigo</TableColumn>
        <TableColumn>Nombre</TableColumn>
        <TableColumn>Tipo</TableColumn>
        <TableColumn>Cantidad</TableColumn>
        <TableColumn>Fecha</TableColumn>
        <TableColumn></TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No hay movimientos registrados"}>
        {currentProducts.map((movement) => (
          <TableRow key={movement.id}>
            <TableCell>{movement.producto_id}</TableCell>
            <TableCell>{movement.producto_nombre}</TableCell>
            <TableCell
              className={`${
                movement.tipo === "salida" ? "text-red-600" : "text-green-600"
              }`}
            >
              {movement.tipo}
            </TableCell>
            <TableCell>{movement.cantidad}</TableCell>
            <TableCell>
              {new Date(movement.fecha).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <button
                className="text-violet-500"
                onClick={() =>
                  handleDeleteMovement(movement.id, setMovements, movements)
                }
              >
                <TrashIcon />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
