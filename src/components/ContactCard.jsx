import React from "react";

const ContactCard = ({ data }) => {
  return (
    <div className="w-full">
      <section className="mx-auto flex aspect-square w-1/3 items-center justify-center rounded-full border border-red-300 p-3 transition-colors duration-300 ease-in-out group-hover:bg-red-300">
        {data.icon}
      </section>
      <p className="font-oswald py-4 text-center text-xl font-bold sm:text-xl xl:text-2xl">
        {data.title}
      </p>
      <p className="text-center text-lg sm:text-lg xl:text-xl">{data.info}</p>
      <p className="text-center text-lg sm:text-lg xl:text-xl">
        info@example.com
      </p>
    </div>
  );
};

export default ContactCard;
