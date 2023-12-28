import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center p-[5%]">
      <h1 className="text-3xl font-bold text-center">
        Fazer parte do Food Delivery é muito fácil
      </h1>
      <div className="max-w-[1000px] flex flex-col gap-20 items-center mt-6 w-full">
        <section className="max-w-[450px] flex flex-col items-center">
          <img
            src="/assets/image1.svg"
            className="pt-6 pb-6 w-[300px] h-[300px]"
            alt="Image Create Restaurant"
          />
          <p className="text-center text-lg">
            Ao clicar em "Quero fazer parte" você inicia seu cadastro para
            assinar um contrato online
          </p>
        </section>

        <section className="max-w-[450px] flex flex-col items-center">
          <img
            src="/assets/image2.svg"
            className="pt-6 pb-6 w-[300px] h-[300px]"
            alt="Image Create Restaurant"
          />
          <p className="text-center text-lg">
            Após a criação, é só seguir as nossas dicas para configurar o seu
            restaurante
          </p>
        </section>

        <section className="max-w-[450px] flex flex-col items-center mt-[-50px]">
          <img
            src="/assets/image3.svg"
            className="pt-6 pb-6 w-[300px] h-[300px]"
            alt="Image Create Restaurant"
          />
          <p className="text-center text-lg">
            Pronto! Seu restaurante será nosso parceiro e já pode receber
            pedidos
          </p>
        </section>

        <Link
          href="/restaurant/create/create-restaurant"
          className="w-full max-w-[1200px] p-4 font-bold flex justify-center items-center bg-[#ea1d2c] text-white mt-16 cursor-pointer transition-all duration-300 hover:bg-[#ee4c58] rounded-xl"
        >
          Quero fazer parte
        </Link>
      </div>
    </div>
  );
};

export default page;
