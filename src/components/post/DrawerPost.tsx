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
import FormPost from "./FormPost";
import { useState } from "react";

const DrawerPost = () => {
    const [open, setOpen] = useState(false);

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="default">
                    Create new post
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="text-center">Ajouter un post</DrawerTitle>
                    <DrawerDescription className="text-center">Renseignez l'enssemble des champs.</DrawerDescription>
                    <FormPost setOpen={setOpen} />
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    );
}

export default DrawerPost;