import React from "react"
import { Link } from "react-router-dom"
import homeImage from "@/assets/homeImage.jpg"
import NewArrival from "./NewArrival"
import Featured from "./Featured"



export default function Hero() {
    return (
        <>
            <section className="relative w-full mt-9 bg-pink-200 overflow-hidden min-h-[70vh] md:min-h-screen">


                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-16">

                   
                    <div className="text-white md:w-1/2 text-center md:text-left space-y-6 md:ml-40">


                        <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
                            SPECIAL <span className="block text-pink-400">MEGA OFFERS</span>
                        </h1>
                        <p className="text-lg md:text-2xl max-w-md font-bold text-gray-700 mb-10">
                            Welcome to our e-commerce platform where you can find the best products at unbeatable prices. Start your shopping journey with us today!
                        </p>
                        <Link
                            to="/products"
                            className="inline-block px-6 py-3 bg-pink-500 hover:bg-pink-600 rounded-full font-semibold transition"
                        >
                            Explore Now
                        </Link>
                    </div>


                    <div className="relative mt-10 md:mt-7 md:w-1/2 flex justify-center">
                        <div className="rounded-full bg-pink-200 p-4 w-64 h-64 md:w-[32rem] md:h-[32rem] flex items-center justify-center">
                            <img
                                src={homeImage}
                                alt="Shopping Group"
                                className="rounded-full object-cover w-5/6 h-5/6 md:w-[30rem] md:h-[30rem]"
                            />
                        </div>
                    </div>

                </div>
            </section>
            <NewArrival />
            <Featured />

        </>
    )
}
