"use client";
import React from 'react';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';

import { BillboardColumn, columns } from './columns';
import { ApiList } from '@/components/ui/api-list';

interface BillboardClientProps {
    data: BillboardColumn[]
}

const BillboardClient: React.FC<BillboardClientProps> = ({
    data
}) => {
    
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading 
                    title={`Billboards (${data.length})`}
                    description='Manage your store billboard here.'/>
                <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                    <Plus className='mr-2 h-4 w-4'/>
                    Add New
                </Button>
            </div>
            <Separator/>
            <DataTable 
                searchKey='label'
                columns={columns}
                data={data}/>
            <Heading
                title="API"
                description="API calls for billboards" />
            <Separator/>
            <ApiList
                entityName='billboards'
                entityIdName='billboardId'/>
        </>
    )
}

export default BillboardClient