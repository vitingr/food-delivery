"use client";

import React from "react";
import ToastMessage from "../Config/ToastMessage";
import Menu from "./EditItems/Menu";
import Purchases from "./EditItems/Purchases";
import MainConfig from "./EditItems/MainConfig";
import Analytics from "./EditItems/Analytics";

type EditMenuProps = {
  currentSection: string;
  restaurantId: string;
  restaurantData: any;
  getRestaurantData: any;
};

const EditMenu = ({
  currentSection,
  restaurantId,
  restaurantData,
  getRestaurantData,
}: EditMenuProps) => {
  return (
    <div className="sm:p-16 p-0 w-full">
      <ToastMessage />
      {currentSection === "ratings" ? (
        <div className="w-full">
          <h1 className="text-center text-3xl font-bold">Avaliações</h1>
        </div>
      ) : (
        <></>
      )}

      {currentSection === "purchases" ? (
        <div className="w-full pl-12 pr-12 max-h-[69vh] overflow-y-scroll">
          <h1 className="text-center text-3xl font-bold mb-[50px]">Pedidos</h1>

          <Purchases
            restaurantId={restaurantId}
            restaurantData={restaurantData}
          />
        </div>
      ) : (
        <></>
      )}

      {currentSection === "menu" ? (
        <div className="w-full pl-12 pr-12 max-h-[69vh] overflow-y-scroll">
          <h1 className="text-center text-3xl font-bold">Cardápio</h1>

          <Menu restaurantId={restaurantId} />
        </div>
      ) : (
        <></>
      )}

      {currentSection === "financial" ? (
        <div className="w-full pl-12 pr-12 max-h-[69vh] overflow-y-scroll h-full">
          <h1 className="text-center text-3xl font-bold">Analytics</h1>

          <Analytics
            restaurantData={restaurantData}
            restaurantId={restaurantId}
          />
        </div>
      ) : (
        <></>
      )}

      {currentSection === "settings" ? (
        <div className="w-full pl-12 pr-12 max-h-[69vh] overflow-y-scroll">
          <h1 className="text-center text-3xl font-bold">Configurações</h1>

          <MainConfig
            restaurantData={restaurantData}
            restaurantId={restaurantId}
            getRestaurantData={getRestaurantData}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default EditMenu;
