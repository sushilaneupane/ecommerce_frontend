import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard Overview</CardTitle>
        </CardHeader>
        <CardContent className="h-screen bg-purple-50 flex items-center justify-center">
          <p>Welcome to your admin panel. Use the sidebar to manage products, categories, and more.</p>

        </CardContent>
      </Card>
    </div>
  );
}
