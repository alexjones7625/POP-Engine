"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  type PieLabelRenderProps,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DollarSign,
  Mail,
  MousePointerClick,
  Eye,
  TrendingUp,
  Users,
} from "lucide-react";

// Placeholder data — in production, fetched from Klaviyo via FastAPI
const accounts = ["CPX", "Switch Research", "Vapor Fresh", "Joyful Bath Co"];

const kpiData = [
  { label: "Revenue (30d)", value: "$24,830", change: "+12.4%", icon: DollarSign },
  { label: "Emails Sent", value: "48,290", change: "+8.1%", icon: Mail },
  { label: "Open Rate", value: "42.3%", change: "+2.1%", icon: Eye },
  { label: "Click Rate", value: "3.8%", change: "+0.4%", icon: MousePointerClick },
  { label: "RPR", value: "$0.51", change: "+15.2%", icon: TrendingUp },
  { label: "List Growth", value: "+1,240", change: "+5.3%", icon: Users },
];

const revenueData = [
  { date: "Jan 20", campaigns: 3200, flows: 4800 },
  { date: "Jan 27", campaigns: 4100, flows: 5200 },
  { date: "Feb 3", campaigns: 3800, flows: 5500 },
  { date: "Feb 10", campaigns: 5200, flows: 4900 },
  { date: "Feb 17", campaigns: 4600, flows: 5800 },
];

const campaignPerformance = [
  { name: "Presidents Day", sent: 12400, opens: 5208, clicks: 471, revenue: 3420 },
  { name: "Valentine's Day", sent: 11800, opens: 5192, clicks: 449, revenue: 2890 },
  { name: "New Arrivals", sent: 10200, opens: 3978, clicks: 316, revenue: 1240 },
  { name: "Tips & Tricks", sent: 9800, opens: 4312, clicks: 382, revenue: 820 },
  { name: "Brand Story", sent: 9400, opens: 3948, clicks: 268, revenue: 540 },
];

const flowRevenue = [
  { name: "Welcome", value: 8400 },
  { name: "Cart Abandon", value: 6200 },
  { name: "Browse Abandon", value: 3800 },
  { name: "Post-Purchase", value: 2400 },
  { name: "Winback", value: 1800 },
];

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export default function AnalyticsPage() {
  const [account, setAccount] = useState("CPX");
  const [period] = useState("30d");

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Performance dashboards across all Klaviyo accounts
          </p>
        </div>
        <div className="flex gap-2">
          {accounts.map((a) => (
            <Badge
              key={a}
              variant={account === a ? "default" : "outline"}
              className="cursor-pointer text-xs"
              onClick={() => setAccount(a)}
            >
              {a}
            </Badge>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {kpiData.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{kpi.label}</span>
                <kpi.icon className="size-3.5 text-muted-foreground" />
              </div>
              <div className="text-lg font-bold">{kpi.value}</div>
              <div className="text-xs text-emerald-400 mt-0.5">
                {kpi.change} vs prev {period}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="flows">Flows</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Trend */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Revenue: Campaigns vs Flows</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={revenueData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis dataKey="date" fontSize={11} stroke="hsl(var(--muted-foreground))" />
                    <YAxis fontSize={11} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `$${v}`} />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                        fontSize: "12px",
                      }}
                    />
                    <Bar dataKey="campaigns" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="flows" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Flow Revenue Split */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Flow Revenue Split</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={flowRevenue}
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      innerRadius={50}
                      dataKey="value"
                      label={(props: PieLabelRenderProps) =>
                        `${props.name ?? ""} ${(((props.percent as number) ?? 0) * 100).toFixed(0)}%`
                      }
                      labelLine={false}
                      fontSize={10}
                    >
                      {flowRevenue.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                        fontSize: "12px",
                      }}
                      formatter={(value?: number) => `$${(value ?? 0).toLocaleString()}`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Campaign Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border border-border rounded-md overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left font-medium px-4 py-2.5 text-muted-foreground">Campaign</th>
                      <th className="text-right font-medium px-4 py-2.5 text-muted-foreground">Sent</th>
                      <th className="text-right font-medium px-4 py-2.5 text-muted-foreground">Opens</th>
                      <th className="text-right font-medium px-4 py-2.5 text-muted-foreground">Clicks</th>
                      <th className="text-right font-medium px-4 py-2.5 text-muted-foreground">Revenue</th>
                      <th className="text-right font-medium px-4 py-2.5 text-muted-foreground">RPR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaignPerformance.map((c) => (
                      <tr key={c.name} className="border-b border-border last:border-0">
                        <td className="px-4 py-3 font-medium">{c.name}</td>
                        <td className="px-4 py-3 text-right text-muted-foreground">{c.sent.toLocaleString()}</td>
                        <td className="px-4 py-3 text-right text-muted-foreground">
                          {((c.opens / c.sent) * 100).toFixed(1)}%
                        </td>
                        <td className="px-4 py-3 text-right text-muted-foreground">
                          {((c.clicks / c.sent) * 100).toFixed(1)}%
                        </td>
                        <td className="px-4 py-3 text-right font-medium">${c.revenue.toLocaleString()}</td>
                        <td className="px-4 py-3 text-right text-muted-foreground">
                          ${(c.revenue / c.sent).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Flows Tab */}
        <TabsContent value="flows" className="mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Flow Revenue Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" fontSize={11} stroke="hsl(var(--muted-foreground))" />
                  <YAxis fontSize={11} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `$${v}`} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                  />
                  <Line type="monotone" dataKey="flows" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
