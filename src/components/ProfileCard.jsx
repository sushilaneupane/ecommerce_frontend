import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


function ProfileCard({ name, role, imageUrl, onClick }) {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
    >
      {/* Photo */}
      <div className="w-full h-48 overflow-hidden rounded-t-md">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <CardContent className="p-4">
        <CardHeader className="p-0 mb-2">
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardDescription className="text-sm mb-4">{role}</CardDescription>
        <Button variant="outline" size="sm" className="border-none">
          View More
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProfileCard;
