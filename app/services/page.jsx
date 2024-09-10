import { getAllServices } from "@/utils/actions";
import React from "react";
import { MdMiscellaneousServices } from "react-icons/md";

const Services = async () => {
  const { data } = await getAllServices();
  console.log(data);
  return (
    <div className="container mx-auto p-6 mt-20">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <MdMiscellaneousServices className="text-4xl mr-3" />
        Our Services
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((service) => (
          <div
            key={service.id}
            className={`bg-white shadow-lg rounded-lg p-6 ${
              !service.is_published ? "opacity-50" : ""
            }`}
          >
            <h2 className="text-2xl font-semibold mb-4">{service.title}</h2>
            <div
              className="prose lg:prose-xl mb-4"
              dangerouslySetInnerHTML={{ __html: service.short_description }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
