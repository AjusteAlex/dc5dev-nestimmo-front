'use client'

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { updatePost } from "@/services/post.service"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchAllCategories } from "@/services/category.service"
import {DrawerClose} from "@/components/ui/drawer";

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
        <form onSubmit={handleSubmit} className="flex justify-center flex-col w-1/2 m-auto gap-4 pt-8">
            <div className="mb-2 flex justify-between">
                <div>
                    <Input
                        defaultValue={post.title}
                        type="text"
                        placeholder="Titre du post"
                        name="title"
                    />
                </div>
                <div>
                    <select name="categorie" required={true}  defaultValue={post.category} >
                        <option value="">Sélectionner une catégorie</option>
                        {data && data.map((category: any) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="mb-2">
                <Textarea
                    defaultValue={post.description}
                    placeholder="Description du post"
                    name="description"
                />
            </div>
            <div className="flex gap-4 justify-center pt-8">
                <DrawerClose>
                    <Button size="lg" variant="destructive">Annuler</Button>
                </DrawerClose>
                <Button type="submit" size="lg" disabled={mutation.isPending}>
                    {mutation.isPending && <span className="mr-4 h-4 w-4 rounded-full bg-white animate-pulse"></span>}
                    Mise a jour du post
                </Button>
            </div>
        </form>
    );
}

export default FormUpdatePost;