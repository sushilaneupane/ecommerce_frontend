import React from "react";
import InfoCard from "../components/InfoCard";
import ProfileCard from "../components/ProfileCard";
import homeImage4 from "@/assets/homeImage4.jpg";
import homeImage2 from "@/assets/homeImage2.jpg";
import homeImage from "@/assets/homeImage.jpg";
import { Button } from "@/components/ui/button";

function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12 space-y-12 mt-9">
            {/* Hero Section */}
            <section className="text-center space-y-4">
                <h1 className="text-4xl font-bold">About Us</h1>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                    Welcome to our website! We are passionate about delivering high-quality products and services to our users. Our mission is to make your experience seamless and enjoyable.
                </p>
                
            </section>

            {/* Info Cards Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InfoCard
                    title="Our Mission"
                    description="To provide exceptional service and innovative solutions that improve the lives of our customers."
                />
                <InfoCard
                    title="Our Vision"
                    description="To be a leader in our industry, setting standards for quality, reliability, and customer satisfaction."
                />
                <InfoCard
                    title="Our Values"
                    description="Integrity, innovation, collaboration, and a commitment to excellence in everything we do."
                />
            </section>

            {/* Team Section */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-center">Meet Our Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <ProfileCard
                        name="Sushila Neupane"
                        role="CEO & Founder – Leading the company with vision and passion."
                        imageUrl={homeImage4}
                    />
                    <ProfileCard
                        name="Anju Bhandari"
                        role="CTO – Innovating and driving technical excellence."
                        imageUrl={homeImage2}
                    />
                    <ProfileCard
                        name="Renusha Kiran Dhanuwar"
                        role="Lead Designer – Crafting beautiful and user-friendly experiences."
                        imageUrl={homeImage}
                    />
                </div>
            </section>




        </div>
    );
}

export default AboutPage;
