import { GitBranch, Mail, BarChart3, BookOpen } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const quickActions = [
  {
    title: "Flow Builder",
    description: "Build and manage email automation flows with visual canvas",
    href: "/flows",
    icon: GitBranch,
    count: "8 templates",
  },
  {
    title: "Campaigns",
    description: "Generate validated email campaigns with 29 frameworks",
    href: "/campaigns",
    icon: Mail,
    count: "12 checks",
  },
  {
    title: "Analytics",
    description: "Performance dashboards across 4 Klaviyo accounts",
    href: "/analytics",
    icon: BarChart3,
    count: "4 accounts",
  },
  {
    title: "Tactics",
    description: "Browse the full indexed tactics library",
    href: "/tactics",
    icon: BookOpen,
    count: "1,280+ tactics",
  },
];

export default function DashboardPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Email Marketing Intelligence Platform
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action) => (
          <Link key={action.href} href={action.href}>
            <Card className="h-full transition-colors hover:bg-accent/50 cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {action.title}
                </CardTitle>
                <action.icon className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  {action.description}
                </p>
                <p className="text-lg font-bold mt-2">{action.count}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
