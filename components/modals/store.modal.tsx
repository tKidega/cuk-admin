"use client"

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/components/ui/modal";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    name: z.string().min(3),
});

export const StoreModal = () => {

    const StoreModal = useStoreModal();
    const form =useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        }
    });
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        //TO-DO: Create a store
    }

    return(
        <Modal
            title="Create Store"
            description="Use this form to add a new store to the existing collection.
                Manage all your products and their respective categories."
            isOpen={StoreModal.isOpen}
            onClose={StoreModal.onClose}>
            <div>
                <div className="space-y-4 py-4 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Store name" {...field}/>
                                        </FormControl>
                                    </FormItem>
                                )}
                            /> 
                            <div 
                                className="pt-8 space-x-2 flex items-center justify-end w-full">
                                <Button>Cancel</Button>    
                                <Button> Next </Button> 
                            </div> 
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    );

};