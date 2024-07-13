'use client'

import { fetchAllPosts } from "@/services/post.service";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import DrawerPost from "@/components/post/DrawerPost";

const PostList = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['getAllPosts'],
        queryFn: fetchAllPosts
    })

    if(isPending) return <div className="h-full flex justify-center items-center">Loading...</div>

    return ( 
        <div>
            <div className="flex justify-between items-center">
                <h2 className="text-4xl font-bold my-5 text-cyan-700">
                    Post list
                </h2>
                <DrawerPost/>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {data?.map((post: any) => (
                    <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
                        <Link href={`/posts/${post.id}`}>
                            <h3 className="text-lg font-medium mb-2 truncate">{post.title}</h3>
                        </Link>
                        {post.category && (
                            <>
                                <p className="text-gray-500">Category: {post.category.name}</p>
                            </>
                        )}
                        <p className="text-gray-500 truncate">{post.description}</p>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default PostList;