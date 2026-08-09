import "./App.css";
import { Suspense, lazy } from "react";
import LoadingComponent from "./components/LoadingComponent";
import { Link } from "react-router";
import { useGetAllProductsQuery } from "./services/productApi";

const ProductComponent = lazy(
  () => import("./components/products/ProductComponent"),
);

function App() {
  const { data, isLoading, isError, refetch } = useGetAllProductsQuery(
    { page: 0, size: 10 },
    { refetchOnMountOrArgChange: true }
  );

  const products = data?.content || [];
  const showLoading = isLoading && products.length === 0;
  const showError = isError && products.length === 0;

  return (
    <div>
      <section className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4 min-h-[400px]">
        {showLoading ? (
          <div className="col-span-full flex justify-center items-center py-20">
            <LoadingComponent />
          </div>
        ) : showError ? (
          <div className="col-span-full text-center py-20 text-red-500">
            <p className="text-lg font-semibold">Failed to load products.</p>
            <button
              onClick={() => refetch()}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
            >
              Retry
            </button>
          </div>
        ) : (
          <Suspense fallback={<LoadingComponent />}>
            {products.map(({ uuid, name, priceOut, thumbnail, category }) => (
              <Link key={uuid} to={`/product/${uuid}`}>
                <ProductComponent
                  title={name}
                  price={priceOut}
                  image={thumbnail}
                  category={category?.name}
                />
              </Link>
            ))}
          </Suspense>
        )}
      </section>
    </div>
  );
}

export default App;
