import { FolderKanban } from "lucide-react";
import React from "react";

function OverviewCard() {
  return (
    <div className="w-full bg-accent p-4 rounded-xl">
      <div className="flex justify-between items-center w-full">
        <h2 className="font-semibold">Active Projects</h2>
        <span className="bg-primary/10 rounded-full p-2 text-primary">
          <FolderKanban size={20} />
        </span>
      </div>
      <h1 className="text-4xl font-bold text-primary">50</h1>
    </div>
  );
}

export default OverviewCard;
