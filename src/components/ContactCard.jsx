import React from "react";

const ContactCard = ({ data }) => {
  return (
    <div>
      <section className="mx-auto w-fit rounded-full border border-red-300 p-3 transition-colors duration-300 ease-in-out group-hover:bg-red-300">
        {data.icon}
      </section>
      <p className="font-oswald py-4 text-center text-lg font-bold">
        {data.title}
      </p>
      <p className="text-center">{data.info}</p>
      <p className="text-center">info@example.com</p>
    </div>
  );
};

export default ContactCard;
