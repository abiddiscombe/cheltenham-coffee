"use client";
import { FunnelIcon } from "lucide-react";
import Button from "@/components/Button";

export default function HeaderFilters() {
  // @todo Add filter controls.

  return (
    <Button variant="ghost" size="icon">
      <FunnelIcon className="w-4.5 h-4.5" />
    </Button>
  );
}
