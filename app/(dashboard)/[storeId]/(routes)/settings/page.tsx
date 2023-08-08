
import React from 'react';
import { auth } from "@clerk/nextjs";
import { GetServerSideProps } from 'next';
import { Store } from "@prisma/client";
import prismadb from "@/lib/prismadb";
import { SettingsForm } from "./components/settings-form";
interface SettingsPageProps {
    initialData: Store | null;
    storeId: string;
}

export const getServerSideProps: GetServerSideProps<SettingsPageProps> = async ({ params }) => {
    const storeId = params?.storeId as string;
    const { userId } = auth();

    if (!userId) {
        return {
            redirect: {
                destination: '/sign-in',
                permanent: false,
            },
        };
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: storeId,
            userId,
        },
    });

    if (!store) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: {
            initialData: store,
            storeId,
        },
    };
};

const SettingsPage: React.FC<SettingsPageProps> = ({ initialData, storeId }) => {
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-6 pt-5">
                <SettingsForm initialData={initialData} storeId={storeId} />
            </div>
        </div>
    );
};

export default SettingsPage;

/*
----Original----
import React from 'react';
import  { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import SettingsForm from "./components/settings-form";

interface SettingsPageProps {
    params: {
        storeId: string;
    }
};

const SettingsPage: React.FC<SettingsPageProps> = async ({
    params
}) => {
    const { userId } = auth();

    if(!userId){
        redirect("/sign-in");
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    });

    if(!store){
        redirect("/");
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-6 pt-5">
                <SettingsForm initialData={store}/>
            </div>
        </div>
    )
}

export default SettingsPage;
*/









