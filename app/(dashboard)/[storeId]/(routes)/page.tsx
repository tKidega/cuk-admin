
import React from "react";
import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
    params: { storeId: string }
};

const DashboardPage: React.FC<DashboardPageProps> = async ({
    params
}) => {
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId
        }
    });

    return(
        <div>Dashboard - {store?.name}</div>
    )
}

export default DashboardPage; 
/*

import React, { useEffect, useState } from "react";
import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
    params: { storeId: string }
};

const DashboardPage: React.FC<DashboardPageProps> = ({ params }) => {
    const [store, setStore] = useState<any>(null);

    useEffect(() => {
        const fetchStore = async () => {
            try {
                const storeData = await prismadb.store.findFirst({
                    where: {
                        id: params.storeId
                    }
                });
                setStore(storeData);
            } catch (error) {
                console.error("Error fetching store:", error);
                // Handle error, set appropriate state, etc.
            }
        };
        fetchStore();
    }, [params.storeId]);

    return (
        <div>Dashboard - {store?.name}</div>
    );
}

export default DashboardPage;

*/