import prismadb from "@/lib/prismadb";

interface DashBoardPageProps {
    params: { storeId: string }
}
const DashboardPage: React.FC<DashboardPageProps> = async ({
    params
}) => {

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId
        }
    });

  return (
    <div>Admin Dashboard - {store?.name}</div>
  );
}

export default DashboardPage; 