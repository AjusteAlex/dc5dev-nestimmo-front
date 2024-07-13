'use client';

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import { Button } from "@/components/ui/button";
import { useState } from "react";
import FormUpdatePost from "@/components/post/FormUpdatePost";

const DrawerUpdatePost = ({post}) => {
    const [open, setOpen] = useState(false);
    if (!post) return null;


    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="default">
                    Modifier
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="text-center">Mise a jour du post {post.title}</DrawerTitle>
                    <DrawerDescription className="text-center">Renseignez l'ensemble des champs.</DrawerDescription>
                    <FormUpdatePost setOpen={setOpen} post={post}/>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    );
}

export default DrawerUpdatePost;