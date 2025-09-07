import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react"; 

function InfoCard({ title, description, onClick }) {
  return (
    <Card
      onClick={onClick}
     className="border-none cursor-pointer hover:scale-105 transform transition-all duration-300 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"

    >
      <CardContent className="p-6 space-y-4">
        <CardHeader className="p-0 space-y-1">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          </div>
        </CardHeader>

        <CardDescription className="text-gray-600 dark:text-gray-300 text-sm">
          {description}
        </CardDescription>

        <Button variant="outline" size="sm" className="border-none">
                 View More
               </Button>
      </CardContent>
    </Card>
  );
}

export default InfoCard;
