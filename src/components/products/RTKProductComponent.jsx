import { useParams } from "react-router";
import { useAddNewProductMutation, useDeleteProductByUUIDMutation, useUpdateProductByUUIDMutation } from "../../services/productApi"


export default function RTKProductComponent() {
    const [createProductRequest, {data}] = useAddNewProductMutation();

    const [updateProductRequest, {data:updateProductResponse}] = useUpdateProductByUUIDMutation();

    const [deleteProductRequest, {data:deleteProductResponse}] = useDeleteProductByUUIDMutation();

    // mock create Product
    const newProduct = {
        "name": "Oudom-ROG Zephyrus G16 (2024)",
        "description": "Ultra-slim gaming and creator laptop featuring an OLED display and AI-powered performance.",
        "computerSpec": {
            "processor": "Intel Core Ultra 9 185H",
            "ram": "32GB LPDDR5X",
            "storage": "1TB PCIe 4.0 NVMe M.2 SSD",
            "gpu": "NVIDIA GeForce RTX 4070 8GB GDDR6",
            "os": "Windows 11 Home",
            "screenSize": "16-inch 2.5K 240Hz OLED",
            "battery": "90Whrs 4-cell Li-ion"
        },
        "stockQuantity": 45,
        "priceIn": 1650.00,
        "priceOut": 1999.99,
        "discount": 10.0,
        "color": [
            {
            "color": "Eclipse Gray",
            "images": [
                "https://cdn.example.com/products/rog-g16-gray-front.jpg",
                "https://cdn.example.com/products/rog-g16-gray-side.jpg"
            ]
            },
            {
            "color": "Platinum White",
            "images": [
                "https://cdn.example.com/products/rog-g16-white-front.jpg",
                "https://cdn.example.com/products/rog-g16-white-side.jpg"
            ]
            }
        ],
        "thumbnail": "https://sm.pcmag.com/pcmag_me/photo/default/02yaw0jtxgkazkkm7s6kolk-3_7w27.jpg",
        "warranty": "2 Years Limited Manufacturer Warranty",
        "availability": true,
        "images": [
            "https://cdn.example.com/products/rog-g16-hero.jpg",
            "https://cdn.example.com/products/rog-g16-keyboard.jpg",
            "https://cdn.example.com/products/rog-g16-ports.jpg"
        ],
        "categoryUuid": "6c0444d4-cf54-425b-839f-f17181cf42ed",
        "supplierUuid": "a34496d2-370e-4332-8c6d-b4a6bc069bf1",
        "brandUuid": "8f2e3bcb-bb0b-45a1-b9bc-1d43f08f0ddb"
        }

     const updateProduct = {
        "name": "Oudom711-ROG Zephyrus G16 (2024)",
        "description": "Ultra-slim gaming and creator laptop featuring an OLED display and AI-powered performance.",
        "stockQuantity": 45,
        "priceIn": 1650.00,
        "priceOut": 1999.99,
        "discount": 10.0,
        "color": [
            {
            "color": "Eclipse Gray",
            "images": [
                "https://cdn.example.com/products/rog-g16-gray-front.jpg",
                "https://cdn.example.com/products/rog-g16-gray-side.jpg"
            ]
            },
            {
            "color": "Platinum White",
            "images": [
                "https://cdn.example.com/products/rog-g16-white-front.jpg",
                "https://cdn.example.com/products/rog-g16-white-side.jpg"
            ]
            }
        ],
        "thumbnail": "https://sm.pcmag.com/pcmag_me/photo/default/02yaw0jtxgkazkkm7s6kolk-3_7w27.jpg",
        "warranty": "2 Years Limited Manufacturer Warranty",
        "availability": true,
        "images": [
            "https://cdn.example.com/products/rog-g16-hero.jpg",
            "https://cdn.example.com/products/rog-g16-keyboard.jpg",
            "https://cdn.example.com/products/rog-g16-ports.jpg"
        ],
        "categoryUuid": "6c0444d4-cf54-425b-839f-f17181cf42ed",
        "supplierUuid": "a34496d2-370e-4332-8c6d-b4a6bc069bf1",
        "brandUuid": "8f2e3bcb-bb0b-45a1-b9bc-1d43f08f0ddb"
        }

    const {uuid} = useParams();
    async function createProductFunc(){
        createProductRequest({
            createProduct : newProduct
        })
    }

    async function updateProductFunc(){
        updateProductRequest({
            
            updateProduct : updateProduct,
            uuid: uuid,
        })
    }
    async function deleteProductFunc(){
        deleteProductRequest({
            uuid: uuid,
        })
    }

  return (
    <div className="flex gap-5">
        <button className="px-6 py-2 min-w-[120px] text-center text-white bg-green-600 border border-green-600 rounded active:text-green-500 hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring" onClick={()=>createProductFunc()}>
        Create Product
      </button>

 
      <button className="px-6 py-2 min-w-[120px] text-center text-white bg-orange-600 border border-orange-600 rounded active:text-orange-500 hover:bg-transparent hover:text-orange-600 focus:outline-none focus:ring" onClick={() => updateProductFunc()}>
        Update Product
      </button>

       
      <button className="px-6 py-2 min-w-[120px] text-center text-white bg-red-600 border border-red-600 rounded active:text-red-500 hover:bg-transparent hover:text-red-600 focus:outline-none focus:ring" onClick={() => deleteProductFunc()}>
        Delete Product
      </button>
 

    </div>
  )
}
