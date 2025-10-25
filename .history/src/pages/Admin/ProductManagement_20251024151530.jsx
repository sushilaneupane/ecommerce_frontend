export default function ProductManagement() {
  const { products, isLoading, isError, create, update, remove } = useProducts();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAdd = () => {
    setSelectedProduct(null);
    setDialogOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      remove.mutate(productId);
    }
  };

  const handleSubmit = (formData) => {
    if (selectedProduct) {
      update.mutate({ id: selectedProduct.id, data: formData });
    } else {
      create.mutate(formData);
    }
  };

  return (
    <>
      <ProductTable
        products={products || []}
        isLoading={isLoading}
        isError={isError}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ProductDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        initialData={selectedProduct}
        onSubmit={handleSubmit}
      />
    </>
  );
}
