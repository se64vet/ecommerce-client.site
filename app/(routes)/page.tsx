import { 
  getSingleBillboard,
  getProducts,
} from "@/actions/get-data";
import Billboard from "@/components/ui/billboard";

import { Container } from "@/components/ui/container";
import ProductList from "@/components/product-list";

export const revalidate = 0;

const Homepage = async () => {
  // fetch default billboard & products
  const billboard = await getSingleBillboard();
  const products = await getProducts({isFeatured: true});
  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />

        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList 
          title= 'Most Popular'
          items={products}
          />
        </div>

      </div>
    </Container>
  )
}

export default Homepage;
