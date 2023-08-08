
import prismadb from "@/lib/prismadb";
interface DashboardPageProps {
    params: { storeId: string }
};

export default async function DashboardPage({
    params
}:{
    params: { storeId: string }
}){
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId
        }
    });

    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-6 pt-5">
                Active Store: {store?.name}
            </div>
        </div>
    )
}
