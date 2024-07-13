'use client'

import DialogConfirmDelete from "@/components/globals/DialogConfirmDelete";
import { useToast } from "@/components/ui/use-toast";
import { deletePost, fetchPostById } from "@/services/post.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import DrawerUpdatePost from "@/components/post/DrawerUpdatePost";

type PostDetailParams = {
    id: string;
}

const PostDetail = () => {
    const { id } = useParams<PostDetailParams>();
    const router = useRouter();
    const { toast } = useToast()

    const { isPending, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () => fetchPostById(id)
    })

    const mutation = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            toast({
                title: 'Post deleted',
                description: 'Your post has been deleted',
            })
            router.push('/')
        }
    });

    const handleDelete = () => {
        mutation.mutate(id);
    }

    if(isPending) return <div className="h-full flex justify-center items-center">Loading...</div>
    
    return (
        <div className="px-8">
            <h3 className="text-lg font-medium mb-2">{data.title}</h3>
            <p>{data.description}</p>

            <DrawerUpdatePost post={data}/>

            <DialogConfirmDelete
                handleDelete={handleDelete}
                isPending={mutation.isPending}
            />
        </div>
    );
}

export default PostDetail;