"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { IBudget } from "@/models/Budget";
import { ChevronRightIcon, Wallet } from "lucide-react";
import Link from "next/link";
import React from "react";

interface BudgetCardProps {
  budget: IBudget;
}

const BudgetCard = ({ budget }: BudgetCardProps) => {
  return (
    <Link
      href={`/budget/${budget._id}`}
      className="block cursor-pointer"
    >
      <Card className="flex">
        <div className="flex-none flex items-center">
          <Wallet className="size-10 m-auto mx-2 bg-muted-background dark:bg-foreground" />
        </div>
        <div className="flex-grow ml-4 items-center flex-col group">
          <CardHeader>
            <div className="flex items-center justify-between gap-x-2 text-base">
              <div className="flex items-center gap-x-2">
                <div className="inline-flex flex-col gap-y-1 justify-center  ">
                  <CardTitle className="text-left text-lg sm:text-sm font-semibold leading-none">
                    {budget.name}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className="align-middle text-xs"
                  >
                    {budget.creatorName}
                  </Badge>
                </div>
                <ChevronRightIcon
                  className={cn(
                    "size-5 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100"
                  )}
                />
              </div>
              <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right">
                {budget.year}
              </div>
            </div>
          </CardHeader>
        </div>
      </Card>
    </Link>
  );
};

export default BudgetCard;
