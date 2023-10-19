import { getProducts, getSingleProduct } from "@/actions/get-data";
import { ProductList as RelatedProduct} from "@/components/product-list";
import { Container } from "@/components/ui/container";
import { ProductInfos } from "@/components/ui/product-infos";
import { NoResults } from "@/components/ui/result-not-found";
import { Product } from "@/global-types";
import Image from "next/image";


interface ProductPageProps {
    params: {
        productId: string;
    },
}
const ProductPage = async ({params}: ProductPageProps) => {
    const product = await getSingleProduct(params.productId);
    const relatedProducts = await getProducts({ 
        categoryId: product?.category?.id
      });
    if (!product) {
        return (
            <Container>
                <NoResults />
            </Container>
        );
    }
        
  return (
    <div>
        <Container>
            <div className="px-4 py-10 sm:px-6 lg:px-8">
                <div className="lg:flex lg:flex-row">

                    <div className="flex-1">
                        <ProductImageGrid product={product} />
                    </div>
                    
                    <div className="flex-1 mt-10 px-4 sm:mt-16  lg:mt-0">
                        <ProductInfos product={product} />
                    </div>

                </div>

                <hr className="my-10" />

                <RelatedProduct 
                title="Watches From Same Brand"
                items={relatedProducts}
                />

            </div>
        </Container>
    </div>
  )
}

const ProductImageGrid = ({product} : {product: Product}) => {
    return (
        <div className="grid grid-cols-1 space-y-4 justify-items-center w-full h-full overflow-hidden">
            {product.images.slice(0, 4).map((img) => (
                <div
                    key={img.id}
                    className="relative w-3/4 aspect-square">
                    <Image
                        fill
                        src={img.url}
                        alt="product image"
                        className="object-cover object-center"
                    />
                </div>
            ))}
        </div>
    )
}

export const revalidate = 0;
export default ProductPage;