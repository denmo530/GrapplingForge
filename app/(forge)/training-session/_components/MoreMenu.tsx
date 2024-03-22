import React from "react";
import { CircleEllipsis } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const MoreMenu = ({ id }: { id: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <CircleEllipsis className="text-muted-foreground cursor-pointer hover:text-primary " />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href={`/training-session/${id}/edit`}>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="text-red-500  hover:bg-red-500/90">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreMenu;
