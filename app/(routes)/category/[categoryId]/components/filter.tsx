"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

// import Button from "@/components/ui/button";
import { cn } from "@/libs/utils";
import { Property as Color, Property as Size } from "@/global-types";

interface FilterProps {
  data: (Size | Color)[];
  name: string;
  valueKey: string;
};

const Filter: React.FC<FilterProps> = ({
  data,
  name,
  valueKey,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedValue = searchParams.get(valueKey);

  const onFiltering = (id: string) => {
    // parse filter property id to query queue
    const currentQueries = qs.parse(searchParams.toString());
    const newQuery = {
      ...currentQueries,
      [valueKey]: id
    };

    // remove id from query queue if filter deselected
    if (currentQueries[valueKey] === id) {
      newQuery[valueKey] = null;
    }

    // finalize url and navigate to target url
    const url = qs.stringifyUrl({
      url: window.location.href,
      query: newQuery,
    }, { skipNull: true });

    router.push(url);
  }

  return ( 
    <div className="mb-8">
      <h3 className="text-lg font-semibold">
        {name}
      </h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {data.map((filter) => (
          <div key={filter.id} className="flex items-center">
            <div
              className={cn(
                'rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-200 cursor-pointer hover:bg-gray-200',
                selectedValue === filter.id && 'bg-black text-white hover:bg-black'
              )}
              onClick={() => onFiltering(filter.id)}
            >
              {filter.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
