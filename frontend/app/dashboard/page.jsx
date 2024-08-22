"use client";

import { StockMovementChart } from "../ui/StockMovementChart";
import { useData } from "../context/DataContext";
import { Card, CardBody } from "@nextui-org/react";

export default function Page() {
  const { products } = useData();
  return (
    <main>
      <h1 className="text-3xl">Dashboard</h1>
      <Card
        className="xl:max-w-[30%] lg:max-w-[50%] h-[40vh]"
        isBlurred
        shadow="sm"
      >
        <CardBody>
          <StockMovementChart data={products} />
        </CardBody>
      </Card>
    </main>
  );
}
