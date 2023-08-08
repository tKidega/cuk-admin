"use client";

import React, { useState } from "react";
import * as z from "zod";
import { Store as PrismaStore } from "@prisma/client";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";

interface SettingsFormProps {
    initialData: PrismaStore | null;
    storeId: string;
}

const formSchema = z.object({
    name: z.string().min(3),
});

type SettingsFormValues = z.infer<typeof formSchema>;

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData, storeId }) => {
    const params = useParams();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const origin = useOrigin();

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {},
    });

    const onSubmit = async (data: SettingsFormValues) => {
        try {
            setLoading(true);
            await axios.patch(`/api/stores/${params.storeId}`, data);
            router.refresh();
            toast.success("Store updated.");
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/stores/${params.storeId}`);
            router.refresh();
            // Redirect to the homepage after successful deletion
            router.push( "/");
            toast.success("Store deleted.");
        } catch (error: any) { 
            if (error.response?.status === 409) {
                toast.error("Make sure all products and categories are deleted first.");
            } else {
                toast.error("Something went wrong.");
            }
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <>
            <AlertModal 
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading} 
            />
            <div className="flex items-center justify-between">
                <Heading title="Settings" description="Manage your store preferences here." />
                <Button
                    disabled={loading}
                    variant="destructive"
                    size="lg"
                    onClick={() => setOpen(true)}>
                    <Trash className="h-5 w-5" />
                    &nbsp;<h3 className="">Delete</h3>
                </Button>
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Store name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        Save Changes
                    </Button>
                </form>
            </Form>
            <Separator />
            <ApiAlert
                title="NEXT_PUBLIC_API_URL"
                description={`${origin}/api/store/${params.storeId}`}
                variant="public"
            />
        </>
    );
};

/*
//Original code

import axios from "axios";
import { useState } from "react";
import * as z from "zod";
import { Store } from "@prisma/client";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage} 
    from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";


interface SettingsFormProps{
    initialData: Store;
}

const formSchema =z.object({
    name: z.string().min(3),
})

type SettingsFormValues = z.infer<typeof formSchema>;

const SettingsForm: React.FC<SettingsFormProps> = ({
    initialData
}) => {

    const params =  useParams();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const origin = useOrigin();

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    });

    const onSubmit = async (data: SettingsFormValues) => {
        //console.log(data); 
        try {
            setLoading(true);
            await axios.patch(`/api/stores/${params.storeId}`, data);
            router.refresh();
            toast.success("Store updated.");
        } catch (error) {
            toast.error("Something went wrong.");
        }finally{
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/stores/${params.storeId}`);
            toast.success("Store deleted.");
            router.refresh();
            // Redirect to the homepage after successful deletion
            router.push("/");
        } catch (error: any) {
            setLoading(false);
            setOpen(false);
            // Check if the error response contains a specific status code indicating a constraint violation
            if (error.response?.status === 409) {
                toast.error("Make sure all products and categories are deleted first.");
            } else {
                toast.error("Something went wrong.");
            }
        }finally{
            setLoading(false);
            setOpen(false);
        }
      };      

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/stores/${params.storeId}`)
            router.refresh();
            router.push("/")
            toast.success("Store deleted.");
        } catch (error) {
            toast.error("Make sure all products and categories are deleted first.");
        }finally{
            setLoading(false);
            setOpen(false);
        }
    }

  
return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}/>
            <div className="flex items-center justify-between">
                <Heading
                    title="Settings"
                    description="Manage your store preferences here."/>
                <Button
                    disabled={loading}
                    variant="destructive"
                    size="lg"
                    onClick={() => setOpen(true)}
                    className="">
                    <Trash className="h-5 w-5"/>
                    &nbsp;<h3 className="">Delete</h3>
                </Button>
            </div>
            <Separator/>
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input 
                                            disabled={loading}
                                            placeholder="Store name"
                                            {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                    </div>
                    <Button 
                        disabled={loading} 
                        className="ml-auto"
                     type="submit">
                        Save Changes
                    </Button>
                </form>
            </Form>
            <Separator/>
            <ApiAlert
                title="NEXT_PUBLIC_API_URL"
                description={`${origin}/api/${params.storeId}`}
                variant="public"/>
        </>
    );
};

export default SettingsForm;
*/


