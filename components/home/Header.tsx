import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

function Header() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold">Overview</h2>
        <p className="text-sm">
          Here&apos;s what&apos;s happening with your projects today.
        </p>
      </div>
      <div>
        <Button>
          Create Project <Plus />
        </Button>
      </div>
    </div>
  );
}

export default Header;
