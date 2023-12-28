import React from "react";

const page = () => {
  return (
    <div className="p-[5%] w-full flex flex-col items-center">
      <h1 className="sm:text-2xl text-3xl font-semibold mb-20 mt-12 sm:mb-28 w-full max-w-[1500px] sm:text-left text-center">
        Informações
      </h1>

      <section className="w-full flex flex-col items-center max-w-[750px]">
        <h1 className="text-3xl font-semibold">Seja bem-vindo ao</h1>
        <h3 className="text-3xl text-[#ea1d2c] font-bold">Food-Delivery</h3>

        <h4 className="mt-10 text-center italic mb-10">
          Estamos comprometidos em proporcionar uma experiência gastronômica
          única e conveniente, trazendo os melhores restaurantes diretamente
          para a sua porta. Com um toque de seus dedos, explore uma variedade de
          opções culinárias e desfrute de refeições deliciosas no conforto da
          sua casa.
        </h4>

        <div className="mt-12">
          <h2 className="text-xl font-semibold">Diversidade Culinária</h2>
          <p className="text-[#717171] text-justify mt-2">
            {" "}
            Explore uma ampla gama de cozinhas, desde pratos locais autênticos
            até delícias internacionais renomadas. Temos algo para satisfazer
            todos os paladares e preferências.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold">Entrega Rápida e Confiável:</h2>
          <p className="text-[#717171] text-justify mt-2">
            {" "}
            Nossa equipe está empenhada em entregar suas refeições com
            eficiência e pontualidade. Desfrute da praticidade de receber seus
            pratos favoritos quando mais precisa.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold">Facilidade de Navegação</h2>
          <p className="text-[#717171] text-justify mt-2">
            {" "}
            ENosso site e aplicativo são intuitivos e fáceis de usar. Navegue
            pelos menus dos restaurantes, faça pedidos personalizados e
            acompanhe sua entrega em tempo real.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold">Ofertas Exclusivas</h2>
          <p className="text-[#717171] text-justify mt-2">
            {" "}
            Mantenha-se atualizado sobre promoções especiais, descontos e
            ofertas exclusivas da nossa plataforma. Valorizamos a lealdade de
            nossos clientes e buscamos recompensá-los sempre que possível.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold">Pensado no Cliente</h2>
          <p className="text-[#717171] text-justify mt-2">
            {" "}
            A satisfação dos nossos clientes é nossa prioridade. Conte com nosso
            serviço de atendimento ao cliente para ajudar com qualquer dúvida ou
            questão que possa surgir durante o processo de pedido.
          </p>
        </div>
      </section>
    </div>
  );
};

export default page;
