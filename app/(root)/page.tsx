"use client";

import { Modal } from '@/components/ui/modal'
import { UserButton } from "@clerk/nextjs"
import { useStoreModal } from '@/hooks/use-store-modal';
import { useEffect } from "react";

import Styles from '@page.module.css'
import Navigator from '@/components/navigator/Navigator'
import Footer from '@/components/footer/Footer'

//import Image from 'next/image'
//import { Button }  from '../../components/ui/button';
//<Button size='default' variant={'outline'}>Click Me</Button>

export default function Home() {

    const onOpen = useStoreModal((state) => state.onOpen); 
    const isOpen = useStoreModal((state) => state.isOpen); 

    useEffect(() => {
        if(!isOpen){
            onOpen();
        }
    }, [isOpen, onOpen]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-4">
            <div className={Styles.navbar}>
                <div className={Styles.nav}>< Navigator /></div>
                <div className={Styles.logout}>
                    <UserButton afterSignOutUrl="/"/>
                </div>
            </div>
            Root Page
            < Footer />
        </main>
    )
}
 