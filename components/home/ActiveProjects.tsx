import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

const fakeProjects = [
  {
    id: "project_001",
    name: "Website Redesign",
    description:
      "Redesign the company website and improve the overall user experience.",
    status: "active",
    color: "#007595",
  },
  {
    id: "project_002",
    name: "Mobile App",
    description: "Build the first version of the company's mobile application.",
    status: "active",
    color: "#7c3aed",
  },
  {
    id: "project_003",
    name: "Marketing Campaign",
    description: "Prepare and launch the Q4 marketing campaign.",
    status: "active",
    color: "#ea580c",
  },
  {
    id: "project_003",
    name: "Marketing Campaign",
    description: "Prepare and launch the Q4 marketing campaign.",
    status: "active",
    color: "#ea580c",
  },
];

function ActiveProjects() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Active Projects</CardTitle>
        <CardDescription>Projects currently in progress.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {fakeProjects.map(
          (project, i) =>
            i <= 2 && (
              <Card
                key={project.id}
                className="p-2 bg-primary/5 border border-primary/10"
              >
                <CardContent className="p-2 flex justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">{project.name}</h2>
                    <p className="text-xs line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                  <Button size="icon-xs">
                    <ChevronRight />
                  </Button>
                </CardContent>
              </Card>
            ),
        )}
      </CardContent>
    </Card>
  );
}

export default ActiveProjects;
