"use client";

import { infoUser } from "@/common/utils/userContext";
import RestaurantOption from "@/components/Restaurant/RestaurantOption";
import { RestaurantProps } from "@/types/types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const page = () => {
  const { data: session, status } = useSession();
  const { data } = infoUser();

  const isFetched = useRef(false);

  const [restaurants, setRestaurants] = useState<RestaurantProps[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const pathname = usePathname().split("/");
  const query = pathname[2];

  const getRestaurants = async () => {
    if (query) {
      try {
        const requisition = await fetch(
          `https://food-delivery-nest-api.vercel.app/restaurant/findRestaurantBySpeciality/${query}`
        );
        const response = await requisition.json();
        console.log(response);
        setRestaurants(response);
      } catch (error) {
        throw new Error("Não foi possível encontrar restaurantes");
      }
    }
  };

  const isRestaurantOpen = async () => {
    const now = new Date();
    const currentHour = now.getHours();
    const open = currentHour <= 23 && currentHour >= 11;

    setIsOpen(open);
  };

  useEffect(() => {
    if (!isFetched.current) {
      if (
        query &&
        status === "authenticated" &&
        session?.user?.email !== undefined
      ) {
        getRestaurants();
        isRestaurantOpen();
      }
    } else {
      isFetched.current = true;
    }
  }, [session]);

  return (
    <div className="p-[5%] w-full flex flex-col items-center">
      <h1 className="selection:bg-[#ea1d2c] selection:text-white text-2xl font-semibold mb-6 w-full max-w-[1500px]">
        Restaurantes
      </h1>

      {restaurants.length > 0 ? (
        <div className="w-full flex flex-col max-w-[1500px]">
          <div className="w-full flex flex-wrap sm:flex-nowrap justify-between sm:gap-6 gap-14 mt-14 max-h-[700px] overflow-hidden">
            <div className="w-full flex flex-col flex-wrap gap-2">
              {restaurants.map((restaurant: RestaurantProps, index: number) => (
                <div key={index}>
                  <RestaurantOption
                    restaurantId={restaurant.id}
                    restaurantData={restaurant}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full p-4 font-bold flex justify-center items-center text-[#ea1d2c] mt-16 cursor-pointer transition-all duration-300 hover:text-white hover:bg-[#ea1d2c] rounded-xl">
            Ver mais
          </div>
        </div>
      ) : (
        <div className="max-w-[1500px] flex flex-col items-center">
          <h1 className="font-semibold selection:bg-[#ea1d2c] selection:text-white text-center">
            Nenhum restaurante encontrado
          </h1>
          <h3 className="mt-4 text-[#717171] selection:bg-[#ea1d2c] selection:text-white text-center">
            Que tal ver outras opções?
          </h3>
          <Link
            className="mt-14 font-semibold text-[#ea1d2c] selection:bg-[#ea1d2c] selection:text-white text-center"
            href="/home"
          >
            Ir para o início
          </Link>
        </div>
      )}
    </div>
  );
};

export default page;
