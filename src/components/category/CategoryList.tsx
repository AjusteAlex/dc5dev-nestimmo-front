'use client'

import { fetchAllCategories } from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import DrawerCategory from "@/components/category/DrawerCategory";

const CategoryList = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['getAllCategories'],
        queryFn: fetchAllCategories
    })

    if(isPending) return <div className="h-full flex justify-center items-center">Loading...</div>

    return ( 
        <div>
            <div className="flex justify-between items-center">
            <h2 className="text-4xl font-bold my-5 text-cyan-700">
                Category list
            </h2>
            <DrawerCategory />
            </div>
            <div className="grid grid-cols-4 gap-2">
                {data?.map((category: any) => (
                    <div key={category.id} className="bg-white rounded-lg shadow-md p-4">
                        <Link href={`/category/${category.id}`}>
                            <h3 className="text-lg font-medium mb-2">{category.name}</h3>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default CategoryList;