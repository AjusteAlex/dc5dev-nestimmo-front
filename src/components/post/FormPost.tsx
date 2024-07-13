'use client'

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { createPost } from "@/services/post.service"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchAllCategories } from "@/services/category.service"
import {DrawerClose} from "@/components/ui/drawer";

type FormPostProps = {
    setOpen: (open: boolean) => void;
}

const FormPost = ({ setOpen } : FormPostProps) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getAllPosts']
            })
            setOpen(false);
        },
    });

    const { isPending, error, data } = useQuery({
        queryKey: ['getAllCategories'],
        queryFn: fetchAllCategories
    })


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const createPostDTO= {
            title: e.currentTarget.title.value,
            description: e.currentTarget.description.value,
            category: e.currentTarget.categorie.value
        }

        mutation.mutate(createPostDTO);
    }

    return ( 
        <form onSubmit={handleSubmit} className="flex justify-center flex-col w-1/2 m-auto gap-4 pt-8">
            <div className="mb-2 flex justify-between">
                <div>
                    <Input
                        type="text"
                        placeholder="Titre du post"
                        name="title"
                    />
                </div>
                <div>
                    <select name="categorie" required={true}>
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
                    placeholder="Description du post"
                    name="description"
                />
            </div>

            <div className="flex gap-4 justify-center">
                <DrawerClose >
                    <Button size="lg" variant="destructive">Annuler</Button>
                </DrawerClose>
                <Button type="submit" size="lg"  disabled={mutation.isPending}>
                    {mutation.isPending && <span className="mr-4 h-4 w-4 rounded-full bg-white animate-pulse"></span>}
                    Créer le post
                </Button>
            </div>

        </form>
     );
}
 
export default FormPost;