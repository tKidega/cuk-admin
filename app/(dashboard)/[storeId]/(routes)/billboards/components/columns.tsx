"use client"

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import CellAction from "./cell-action";

export type BillboardColumn = {
  id: string
  label: string
  createdAt: string
}

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: ({ column }) => {
        return (
            <Button
                className=""
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Billboard label
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
      },

  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original}/>,
  },
]
