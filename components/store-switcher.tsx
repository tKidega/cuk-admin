"use client";

import { useState } from "react";
import { Popover,PopoverTrigger,PopoverContent } from "@/components/ui/popover";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Store } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
    Check, 
    ChevronsUpDown, 
    PlusCircle, 
    Store as StoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
    Command, 
    CommandEmpty, 
    CommandGroup, 
    CommandInput, 
    CommandItem, 
    CommandList, 
    CommandSeparator} from "@/components/ui/command";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[];
}

function StoreSwitcher({
    className,
    items = []
}: StoreSwitcherProps){
    const storeModal = useStoreModal();
    const params = useParams();
    const router = useRouter();

    const formattedItems = items.map((item) => ({
        label: item.name,
        value: item.id
    })); 

    const currentStore = formattedItems.find((item) => item.value === params.storeId);
    const [open, setOpen] = useState(false);

    const onStoreSelect = (store: {value: string, label: string}) => {
       setOpen(false);
       router.push(`/${store.value}`);
    }

    return (
        <Popover
            open={open}
            onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select a store"
                    className={cn("w-[250px] justify-between", className)}>
                    <StoreIcon className="mr-2 h-4 w-4" />
                    <h4 className="">{currentStore?.label}</h4>
                    <ChevronsUpDown
                    className="ml-auto h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Command>
                    <CommandList>
                        <CommandInput
                            placeholder="Search current stores..."/>
                            <CommandEmpty>No Stores found</CommandEmpty>
                            <CommandGroup heading="Stores">
                                {formattedItems.map((store) => (
                                    <CommandItem
                                        key={store.value}
                                        onSelect={() => onStoreSelect(store)}
                                        className="mr-2" h-4 w-4>
                                        {store.label}
                                        <Check 
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                currentStore?.value === store.value
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                        )} />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                    </CommandList>
                    <CommandSeparator/>
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    setOpen(false)
                                    storeModal.onOpen();
                                }}>
                                <PlusCircle
                                    className="mr-2 h-5 w-5"/>
                                    Create new store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default StoreSwitcher