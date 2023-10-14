import qs from "query-string";
import { 
    Billboard,
    Category,
    Product,
    Property as Color,
    Property as Size,
} from "@/global-types";

// -------------------------------------------------------------------

// api endpoints for data fetching
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const BILLBOARDS_URL = BASE_URL + '/billboards';
const CATEGORIES_URL = BASE_URL + '/categories';
const PRODUCTS_URL = BASE_URL + '/products';
const COLORS_URL = BASE_URL + '/colors';
const SIZES_URL = BASE_URL + '/sizes';



// get functions
const getSingleBillboard = async (
    billboardId : string = process.env.DEFAULT_BILLBOARD_ID!
) : Promise<Billboard> => {
    
   try {
        const res = await fetch(`${BILLBOARDS_URL}/${billboardId}`);
        return res.json();
    } catch (error) {
        console.log('getSingleBillboard'.toUpperCase(),error);
        return emptyBillboard
    }
}

const getAllCategories = async () : Promise<Category[]> => {
    try {
        const res = await fetch(CATEGORIES_URL);
        return res.json();
    } catch (error) {
        console.log('getAllCategories'.toUpperCase(),error);
        const emptyCategories : Category[] = [];
        return emptyCategories;
    }
}

const getSingleCategory = async (categoryId: string) : Promise<Category> => {
    try {
        const res = await fetch(`${CATEGORIES_URL}/${categoryId}`);
        return res.json();
        
    } catch (error) {
        console.log('getSingleCategory'.toUpperCase(),error);
        return emptyCategory;
    }
}

const getAllColors = async () : Promise<Color[]> => {
    try {
        const res = await fetch(COLORS_URL);
        return res.json();
        
    } catch (error) {
        console.log('getAllColors'.toUpperCase(),error);
        return [];
    }
}

const getAllSizes = async () : Promise<Size[]> => {
    try {
        const res = await fetch(SIZES_URL);
        return res.json();
        
    } catch (error) {
        console.log('getAllColors'.toUpperCase(),error);
        return [];
    }
}

const getProducts = async (query: ProductQuery) : Promise<Product[]> => {
    const PRODUCTS_URL_WITH_QUERIES = qs.stringifyUrl({
        url: PRODUCTS_URL,
        query: { 
          colorId: query.colorId,
          sizeId: query.sizeId,
          categoryId: query.categoryId,
          isFeatured: query.isFeatured,
        },
      });

      try {
        const res = await fetch(PRODUCTS_URL_WITH_QUERIES);
        return res.json();
        
      } catch (error) {
        console.log('getProducts'.toUpperCase(),error);
        const emptyProducts : Product[] = [];
        return emptyProducts;
      }
}

const getSingleProduct = async (productId: string): Promise<Product> => {
    try {
        const res = await fetch(`${PRODUCTS_URL}/${productId}`);
        return res.json();
        
        
    } catch (error) {
        console.log('getAllColors'.toUpperCase(),error);
        return emptyProduct;
    }
};
  

// interfaces & empty values 
interface ProductQuery {
    categoryId?: string;
    colorId?: string;
    sizeId?: string;
    isFeatured?: boolean;
}
const emptyBillboard : Billboard = {
    id: "",
    imgUrl: "",
    label: "404 Billboard not found"
} 
const emptyCategory : Category = {
    billboard: emptyBillboard,
    id: "",
    name:""
};
const emptyColor : Color = {
    id:"", 
    name:"", 
    value: ""
};
const emptySize : Size = {
    id:"", 
    name:"", 
    value: ""
};
const emptyProduct : Product = {
    id: "",
    category: emptyCategory,
    color: emptyColor,
    size: emptySize,
    isFeatured: false,
    price: "",
    name: "",
    images: []
}
// exports modules
export {
    getAllCategories,
    getAllColors,
    getAllSizes,
    getProducts,
    getSingleProduct,
    getSingleBillboard,
    getSingleCategory,
}