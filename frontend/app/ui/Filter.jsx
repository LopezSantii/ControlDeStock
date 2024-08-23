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
import { FilterIcon, SearchIcon } from "./Icons";

export default function Filter({ setSelectedProduct, products, setDateRange }) {
  return (
    <Dropdown backdrop="blur" closeOnSelect={false}>
      <DropdownTrigger>
        <Button variant="flat" color="secondary">
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
  );
}
