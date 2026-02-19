import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { flowTemplates } from "@/lib/flow-templates";

export default function FlowsPage() {
  // In production, this would fetch saved flows from the database.
  // For now, show templates as starting points.
  const templates = flowTemplates.filter((t) => t.id !== "custom");

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Flows</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Build and manage email automation flows
          </p>
        </div>
        <Link href="/flows/new">
          <Button size="sm">
            <Plus className="size-4 mr-1" />
            New Flow
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Link key={template.id} href={`/flows/${template.id}`}>
            <Card className="h-full transition-colors hover:bg-accent/50 cursor-pointer">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{template.icon}</span>
                    <CardTitle className="text-sm">{template.name}</CardTitle>
                  </div>
                  {template.badge && (
                    <Badge variant="secondary" className="text-[10px]">
                      {template.badge}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                  {template.description}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] font-mono">
                    {template.emailCount}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] font-mono">
                    {template.tacticId}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
