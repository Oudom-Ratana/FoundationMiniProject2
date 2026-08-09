import {Avatar, Button, Checkbox, Chip, Table} from "@heroui/react";

import React, { useEffect, useState } from "react";
import {Icon} from "@iconify/react";
import { useGetAllProductsQuery } from "../../services/productApi";

export default function ProductTableComponent() {
  const [page, setPage] = useState(0);
  const size = 10;
  
  const { data: products, isLoading, isFetching } = useGetAllProductsQuery({ page, size });
  console.log(`===> fetch product`, products?.content);

  return (
    <div className="flex flex-col gap-4">
      <Table className="p-8">
        <Table.ScrollContainer>
            <Table.Content aria-label="Team members"  >
              <Table.Header>
                <Table.Column isRowHeader>Product UUID</Table.Column>
                <Table.Column>Image</Table.Column>
                <Table.Column>Product Name</Table.Column>
                <Table.Column>Quantity</Table.Column>
                <Table.Column>Price</Table.Column>
                <Table.Column>Category</Table.Column>
                <Table.Column>Actions</Table.Column>
              </Table.Header>
              <Table.Body>
                {
                   products?.content?.map(u => (
                    <Table.Row key={u?.uuid} >
                      <Table.Cell>{u?.uuid}</Table.Cell>
                    <Table.Cell>
                      <img src={u?.thumbnail} alt="" className="w-12 h-12" />
                    </Table.Cell>
                    <Table.Cell>{u?.name}</Table.Cell>
                    <Table.Cell>{u?.stockQuantity}</Table.Cell>
                    <Table.Cell>{u?.priceOut}</Table.Cell>
                    <Table.Cell>{u?.category?.name}</Table.Cell>
                     <Table.Cell>
                  <div className="flex items-center gap-1">
                    <Button isIconOnly size="sm" variant="tertiary">
                      <Icon className="size-4" icon="gravity-ui:eye" />
                    </Button>
                    <Button isIconOnly size="sm" variant="tertiary">
                      <Icon className="size-4" icon="gravity-ui:pencil" />
                    </Button>
                    <Button isIconOnly size="sm" variant="danger-soft">
                      <Icon className="size-4" icon="gravity-ui:trash-bin" />
                    </Button>
                  </div>
                </Table.Cell>
                  </Table.Row>
                   ))
                }
              </Table.Body>
            </Table.Content>
        </Table.ScrollContainer>
      </Table>


      <div className="flex justify-between items-center px-8 py-4 bg-gray-50/50 dark:bg-zinc-800/40 rounded-xl border border-gray-100 dark:border-zinc-800 mx-8">
        <span className="text-sm text-gray-500 font-medium">
          Page {page + 1} of {products?.totalPages || 1}
        </span>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="flat"
            color="primary"
            startContent={<Icon className="size-4" icon="gravity-ui:arrow-left" />}
            isDisabled={page === 0 || isLoading || isFetching}
            onClick={() => setPage((prev) => Math.max(0, prev - 1))}
          >
            Previous
          </Button>
          <Button
            size="sm"
            variant="flat"
            color="primary"
            endContent={<Icon className="size-4" icon="gravity-ui:arrow-right" />}
            isDisabled={products?.last || isLoading || isFetching}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
