import { useState, useMemo } from "react";
import { TrashIcon } from "./Icons";
import {
  calculatePages,
  GetcurrentProducts,
  handleDelete,
} from "../../js/utils";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";

export default function TableOfStock({ products, setProducts }) {
  const [page, setPage] = useState(1);
  const pages = useMemo(() => calculatePages(products), [products]);
  const currentProducts = useMemo(
    () => GetcurrentProducts(page, products),
    [page, products]
  );

  return (
    <div>
      <Table
        shadow="lg"
        aria-label="Tabla de control de stock de productos"
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
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          <TableColumn>Codigo</TableColumn>
          <TableColumn>Nombre</TableColumn>
          <TableColumn>Descripcion</TableColumn>
          <TableColumn>Cantidad</TableColumn>
          <TableColumn>Precio por Un</TableColumn>
          <TableColumn></TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No hay productos"}>
          {currentProducts.map((producto) => (
            <TableRow key={producto.id}>
              <TableCell>{producto.id}</TableCell>
              <TableCell>{producto.nombre}</TableCell>
              <TableCell>{producto.descripcion}</TableCell>
              <TableCell>{producto.cantidad}</TableCell>
              <TableCell>${producto.precio}</TableCell>
              <TableCell>
                <button
                  className="text-violet-500"
                  onClick={() =>
                    handleDelete(producto.id, setProducts, products)
                  }
                >
                  <TrashIcon />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
