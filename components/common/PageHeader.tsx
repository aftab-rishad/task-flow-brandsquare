import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

function PageHeader({ title, description, ctaText, ctaLink }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-sm">{description}</p>
      </div>
      <div>
        <Button render={<Link prefetch href={ctaLink} />}>
          {ctaText} <Plus />
        </Button>
      </div>
    </div>
  );
}

export default PageHeader;
