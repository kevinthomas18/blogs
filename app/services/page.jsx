import React from "react";
import { MdMiscellaneousServices } from "react-icons/md";

const Services = () => {
  const services = [
    {
      title: "Strategy",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo sagittis suscipit ultrices.",
    },
    {
      title: "Branding",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo sagittis suscipit ultrices.",
    },
    {
      title: "Development",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo sagittis suscipit ultrices.",
    },
    {
      title: "Web Design",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo sagittis suscipit ultrices.",
    },
    {
      title: "Social Media",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo sagittis suscipit ultrices.",
    },
    {
      title: "Ecommerce",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo sagittis suscipit ultrices.",
    },
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Our Services</h2>
        <p className="text-gray-600 mt-4">
          Consectetur adipiscing elit nullam nunc justo sagittis suscipit
          ultrices.
        </p>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {services.map((service, index) => (
          <div key={index} className="text-center">
            <div className="flex justify-center items-center bg-teal-200 w-20 h-20 mx-auto rounded-full mb-4">
              <MdMiscellaneousServices className="text-teal-600 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold">{service.title}</h3>
            <p className="text-gray-600 mt-2">{service.description}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <button className="bg-transparent text-teal-600 border border-teal-600 rounded-md px-6 py-2 hover:bg-teal-600 hover:text-white transition duration-300">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Services;
