
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

import Navbar  from "@/components/navbar";

export default async function DashboardLayout({
    children,
    params
}:{
    children: React.ReactNode;
    params: { storeId: string }
}){
    const { userId } = auth();

    if(!userId){
        redirect('/sign-in');
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    });

    if(!store){
        redirect('/');
    }

    return(
        <>
            <div><Navbar/></div>
            {children}
        </>
    )
}
/*

import { auth } from "@clerk/nextjs";
import { useRouter } from 'next/router';
import prismadb from "@/lib/prismadb";

import Navbar from "@/components/navbar";

interface DashboardLayoutProps {
    children: React.ReactNode;
    params: { storeId: string };
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    children,
    params
}) => {
    const router = useRouter();
    const { userId } = auth();

    if (!userId) {
        router.push('/sign-in');
        return null; // Return null to avoid rendering the component content when redirecting
    }

    const fetchStore = async () => {
        try {
            const store = await prismadb.store.findFirst({
                where: {
                    id: params.storeId,
                    userId
                }
            });

            if (!store) {
                router.push('/');
                return null; // Return null to avoid rendering the component content when redirecting
            }
        } catch (error) {
            console.error("Error fetching store:", error);
            // Handle error, set appropriate state, etc.
        }
    };

    fetchStore();

    return (
        <>
            <div><Navbar /></div>
            {children}
        </>
    );
};

export default DashboardLayout;
*/