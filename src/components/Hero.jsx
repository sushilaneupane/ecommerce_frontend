import React from "react"
import { Button } from "@/components/ui/button"
import homeImage3 from "@/assets/homeImage3.jpg"
import { Link } from "react-router-dom"
import NewArrival from "./NewArrival";
import Featured from "./Featured";




export default function Hero() {
    return (
        <>
        <section className="relative h-screen w-full mt-9">
            <img
                src={homeImage3}
                alt="Hero"
                className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/50" />

            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
                <h1 className="text-5xl font-bold mb-4">Welcome to Our Website</h1>
                <p className="text-lg mb-6 max-w-xl">
                    Well come to our e-commerce platform where you can find the best products at unbeatable prices. Start your shopping journey with us today!
                </p>
                <Link to="/products" className="hover:bg-blue-700">
                    Explore.....
                </Link>

            </div>
        </section>
        <NewArrival />
        <Featured />
        </>

    )
}
