import React from 'react'
import { Container } from '@/components/ui/container';
import Billboard from '@/components/ui/billboard';
import Filter from './components/filter';
import { getAllColors, getAllSizes, getProducts, getSingleCategory } from '@/actions/get-data';
import { NoResults } from '@/components/ui/result-not-found';
import { ProductCard } from '@/components/ui/product-card';
import { Product } from '@/global-types';

interface CategoryPageProps {
    params: {
        categoryId: string;
    },

    searchParams: {
        colorId: string;
        sizeId: string;
    }
}

const CategoryPage = async ({params, searchParams}: CategoryPageProps) => {
    const category = await getSingleCategory (params.categoryId);
    const sizes = await getAllSizes();
    const colors = await getAllColors();

    const products = await getProducts({ 
        categoryId: params.categoryId,
        colorId: searchParams.colorId,
        sizeId: searchParams.sizeId,
      });
  return (
    <div>
        <Container>
            <Billboard data={category.billboard}/>

            <div className="px-4 sm:px-6 lg:px-8 pb-24">
                <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                    {/* <MobileFilters sizes={sizes} colors={colors} /> */}
                    <div className="hidden lg:block">
                        <Filter
                            valueKey="sizeId" 
                            name="Sizes" 
                            data={sizes}
                        />
                        <Filter 
                            valueKey="colorId" 
                            name="Colors" 
                            data={colors}
                        />
                    </div>
                    <div className="mt-6 lg:col-span-4 lg:mt-0">
                        <ProductPanel products={products} />
                    </div>
                    
                </div>
            </div>
        </Container>
    </div>
  )
}

const ProductPanel = ({ products } : {products: Product[]}) => {
    return (
        <>
            {products.length === 0 && <NoResults />}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((item) => (
                    <ProductCard key={item.id} data={item} />
                ))}
            </div>
        </>
    )
}
export default CategoryPage;