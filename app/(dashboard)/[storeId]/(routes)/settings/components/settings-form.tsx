"use client";

import { useState } from "react";
import * as z from "zod";
import { Store } from "@prisma/client";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface SettingsFormProps{
    initialData: Store;
}

const formSchema =z.object({
    name: z.string().min(1),
})

type SettingsFormValues = z.infer<typeof formSchema>;

const SettingsForm: React.FC<SettingsFormProps> = ({
    initialData
}) => {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    });

    const onSubkit = async (data: SettingsFormValues) => {
        console.log(data);
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title="Settings"
                    description="Manage your store preferences here."/>
                <Button
                    variant="destructive"
                    size="lg"
                    onClick={() => {}}
                    className="">
                    <Trash className="h-5 w-5"/>
                    &nbsp;Delete
                </Button>
            </div>
            <Separator/>
        </>
    );
};

export default SettingsForm