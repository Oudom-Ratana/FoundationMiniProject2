import React, { useState, useMemo } from "react";
import { Table, Button, Avatar, Chip, Pagination, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useGetAllProductsQuery } from "../../services/productApi";

export default function PaginationDataTable() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  
  const { data: productsData, isLoading, isFetching } = useGetAllProductsQuery({
    page: page - 1,
    size: size,
  });

  const totalPages = productsData?.totalPages || 1;
  const totalElements = productsData?.totalElements || 0;
  const products = productsData?.content || [];

  // Handle page size changes
  const handleSizeChange = (e) => {
    setSize(Number(e.target.value));
    setPage(1); // Reset to page 1 on size change
  };

  // Helper for rendering table cells to keep JSX clean and readable
  const renderCell = (product, columnKey) => {
    switch (columnKey) {
      case "uuid":
        return (
          <span className="font-mono text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
            {product.uuid}
          </span>
        );
      case "image":
        return (
          <div className="relative group">
            <Avatar
              src={product.thumbnail}
              alt={product.name}
              radius="lg"
              className="w-12 h-12 border-2 border-gray-200 object-cover shadow-sm group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        );
      case "name":
        return (
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800 dark:text-gray-100 text-sm hover:text-primary transition-colors">
              {product.name}
            </span>
            {product.description && (
              <span className="text-xs text-gray-400 max-w-[250px] truncate">
                {product.description}
              </span>
            )}
          </div>
        );
      case "quantity":
        const isLowStock = product.stockQuantity <= 10;
        return (
          <Chip
            size="sm"
            variant="flat"
            color={isLowStock ? "danger" : "success"}
            className="font-medium"
          >
            {product.stockQuantity} units
          </Chip>
        );
      case "price":
        const hasDiscount = product.discount > 0;
        const discountedPrice = hasDiscount
          ? (product.priceOut * (1 - product.discount / 100)).toFixed(2)
          : product.priceOut;

        return (
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-gray-900 dark:text-white">
                ${discountedPrice}
              </span>
              {hasDiscount && (
                <Chip size="sm" variant="solid" color="danger" className="text-[10px] h-4 px-1 min-w-0">
                  -{product.discount}%
                </Chip>
              )}
            </div>
            {hasDiscount && (
              <span className="text-xs text-gray-400 line-through">
                ${product.priceOut.toFixed(2)}
              </span>
            )}
          </div>
        );
      case "category":
        return (
          <Chip
            size="sm"
            variant="dot"
            color="primary"
            className="capitalize font-medium"
          >
            {product.category?.name || "Uncategorized"}
          </Chip>
        );
      case "actions":
        return (
          <div className="flex items-center gap-1.5">
            <Button
              isIconOnly
              size="sm"
              variant="light"
              className="text-gray-500 hover:text-primary hover:bg-primary-50 transition-colors"
              title="View Product"
            >
              <Icon className="size-4" icon="gravity-ui:eye" />
            </Button>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              className="text-gray-500 hover:text-warning hover:bg-warning-50 transition-colors"
              title="Edit Product"
            >
              <Icon className="size-4" icon="gravity-ui:pencil" />
            </Button>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              className="text-gray-500 hover:text-danger hover:bg-danger-50 transition-colors"
              title="Delete Product"
            >
              <Icon className="size-4" icon="gravity-ui:trash-bin" />
            </Button>
          </div>
        );
      default:
        return product[columnKey];
    }
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-zinc-800">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
            Products Catalog
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Manage your store items, stock status, pricing, and classifications.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <label className="text-xs text-gray-500 font-medium">Rows per page:</label>
          <select
            value={size}
            onChange={handleSizeChange}
            className="text-xs border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-700 dark:text-gray-200 rounded-lg p-1.5 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer font-medium"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

            <div className="relative border border-gray-100 dark:border-zinc-800 rounded-xl overflow-hidden">
        
        {(isLoading || isFetching) && (
          <div className="absolute inset-0 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-[1px] z-50 flex items-center justify-center transition-all duration-300">
            <div className="flex flex-col items-center gap-2">
              <Spinner size="lg" color="primary" />
              <span className="text-xs text-primary font-medium tracking-wide animate-pulse">
                Loading products...
              </span>
            </div>
          </div>
        )}

        <Table aria-label="Paginated products data table" removeWrapper className="w-full">
          <Table.ScrollContainer>
            <Table.Content>
              <Table.Header>
                <Table.Column width={180}>UUID</Table.Column>
                <Table.Column width={70}>Image</Table.Column>
                <Table.Column>Product Name</Table.Column>
                <Table.Column width={110}>Quantity</Table.Column>
                <Table.Column width={120}>Price</Table.Column>
                <Table.Column width={150}>Category</Table.Column>
                <Table.Column width={110} align="center">Actions</Table.Column>
              </Table.Header>
              <Table.Body emptyContent={"No products found."}>
                {products.map((product) => (
                  <Table.Row key={product.uuid} className="hover:bg-gray-50/50 dark:hover:bg-zinc-800/40 transition-colors">
                    <Table.Cell>{renderCell(product, "uuid")}</Table.Cell>
                    <Table.Cell>{renderCell(product, "image")}</Table.Cell>
                    <Table.Cell>{renderCell(product, "name")}</Table.Cell>
                    <Table.Cell>{renderCell(product, "quantity")}</Table.Cell>
                    <Table.Cell>{renderCell(product, "price")}</Table.Cell>
                    <Table.Cell>{renderCell(product, "category")}</Table.Cell>
                    <Table.Cell>{renderCell(product, "actions")}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>

      {/* Footer Controls: Pagination Status & Pagination Control */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-4 border-t border-gray-100 dark:border-zinc-800">
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
          Showing {products.length > 0 ? (page - 1) * size + 1 : 0} to{" "}
          {Math.min(page * size, totalElements)} of {totalElements} products
        </span>

        {totalPages > 1 && (
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={totalPages}
            onChange={(newPage) => setPage(newPage)}
            className="shadow-none"
          />
        )}
      </div>
    </div>
  );
}
