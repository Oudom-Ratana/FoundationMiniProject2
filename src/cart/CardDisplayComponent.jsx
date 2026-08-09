import { removeFromCart } from "../features/cart/cartSlice";
import { decrement } from "../features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";

export default function zCartDisplayComponent() {
  const dispatch = useAppDispatch();
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  console.log(`==> Total Price: ${totalPrice}`);
  const products = useAppSelector((state) => state.cart.products);
  return (
    <section className=" w-full h-[700px] relative bg-white  ">
      <div className="bg-white flex flex-col h-full absolute right-0 p-10 w-[450px]">
        <div className="flex items-center mb-3 justify-between ">
          <h2 className="text-[#191919] text-xl font-medium leading-[30px]">
            Shopping Card ({products.length})
          </h2>
          <svg
            width={45}
            height={45}
            viewBox="0 0 45 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="22.5" cy="22.5" r="22.5" fill="white" />
            <path
              d="M28.75 16.25L16.25 28.75"
              stroke="#1A1A1A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.25 16.25L28.75 28.75"
              stroke="#1A1A1A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {/* display addtoCart */}
        {products.map((pro, index) => (
          <div key={pro.id || index} className="flex gap-2 mb-6 items-center">
            <img width={120} height={100} src={pro.thumbnail} alt="" />
            <div>
              <h3 className="w-[216px] text-[#191919] text-sm font-normal leading-[21px]">
                {pro.title}
              </h3>
              <p>
                <span className="relative justify-start text-red-500 text-sm font-semibold leading-[16.80px]">
                  {" "}
                  ${pro.price}
                </span>
              </p>
            </div>
            <svg
              width={32}
              height={32}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer hover:opacity-75 transition-opacity ml-auto"
              onClick={() => {
                dispatch(removeFromCart(pro.id || index));
                dispatch(decrement());
              }}
              title="Remove item"
            >
              <g clipPath={`url(#clip0_${pro.id || index})`}>
                <path
                  d="M12 23C18.0748 23 23 18.0748 23 12C23 5.92525 18.0748 1 12 1C5.92525 1 1 5.92525 1 12C1 18.0748 5.92525 23 12 23Z"
                  stroke="#CCCCCC"
                  strokeMiterlimit={10}
                />
                <path
                  d="M16 8L8 16"
                  stroke="#666666"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M16 16L8 8"
                  stroke="#666666"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
              <defs>
                <clipPath id={`clip0_${pro.id || index}`}>
                  <rect width={24} height={24} fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        ))}

        <div className="mt-auto">
          <div className=" py-6 bg-white flex justify-between items-center">
            <span className="relative justify-start text-[#191919] text-base font-normal leading-normal">
              {products.length} Product
            </span>
            <span className="relative justify-start text-red-500 text-base font-semibold leading-tight">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <button className="w-full px-10 py-4 bg-[#00b206] rounded-[43px] text-white text-base font-semibold leading-tight">
            Checkout
          </button>
          <button className="w-[376px] mt-3 px-10 py-4 bg-[#56ac59]/10 rounded-[43px] text-[#00b206] text-base font-semibold leading-tight">
            Go To Cart
          </button>
        </div>
      </div>
    </section>
  );
}