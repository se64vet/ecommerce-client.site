import React from 'react'
import { Container } from '@/components/ui/container';
import Billboard from '@/components/ui/billboard';
import Filter from './components/filter';
import { getAllColors, getAllSizes, getSingleCategory } from '@/actions/get-data';

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
                    
                </div>
            </div>
        </Container>
    </div>
  )
}

export default CategoryPage;