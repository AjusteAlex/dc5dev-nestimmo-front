'use client'

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {createPost, fetchPostById, updatePost} from "@/services/post.service"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchAllCategories } from "@/services/category.service"

type FormPostProps = {
    setOpen: (open: boolean) => void;
    post: any;
}

const FormUpdatePost = ({ setOpen, post } : FormPostProps) => {
    const queryClient = useQueryClient();

    const { isPending, error, data } = useQuery({
        queryKey: ['getAllCategories'],
        queryFn: fetchAllCategories
    })

    const mutation = useMutation({
        mutationFn: updatePost,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getAllPosts']
            })
            setOpen(false);
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updatePostDTO = {
            id: post.id,
            title: e.currentTarget.title.value,
            description: e.currentTarget.description.value,
            category: e.currentTarget.categorie.value
        }
        mutation.mutate(updatePostDTO);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-2">
                <Input
                    defaultValue={post.title}
                    type="text"
                    placeholder="Post title"
                    name="title"
                />
            </div>
            <div className="mb-2">
                <Textarea
                    defaultValue={post.description}
                    placeholder="Post description"
                    name="description"
                />
            </div>
            <div>
                <select name="categorie" defaultValue={post.category} >
                    <option value="">Select a category</option>
                    {data && data.map((category: any) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <Button type="submit" className="w-full" disabled={mutation.isPending}>
                    {mutation.isPending && <span className="mr-4 h-4 w-4 rounded-full bg-white animate-pulse"></span>}
                    Mise a jour du post
                </Button>
            </div>
        </form>
    );
}

export default FormUpdatePost;