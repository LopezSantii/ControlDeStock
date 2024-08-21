import { useState, useMemo, useEffect } from "react";
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
  Button,
} from "@nextui-org/react";
import { fetchProducts } from "../../js/services";

export default function TableOfStock({ render, setRender }) {
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    fetchProducts()
      .then((data) => setProductos(data))
      .catch((error) => console.error(error));
  }, [render === true]);

  const [page, setPage] = useState(1);
  const pages = useMemo(() => calculatePages(productos), [productos]);
  const currentProducts = useMemo(
    () => GetcurrentProducts(page, productos),
    [page, productos]
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
                    handleDelete(producto.id, setProductos, productos)
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
