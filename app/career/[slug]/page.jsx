"use client";
import React from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

const SingleJob = () => {
  // Dummy job data
  const job = {
    title: "Frontend Developer",
    description:
      "We are looking for a skilled frontend developer to join our team. You will work on building modern, responsive web applications.",
    responsibilities:
      "Develop and maintain web applications, collaborate with designers and backend developers.",
    requirements:
      "Proficiency in HTML, CSS, JavaScript, and React; experience with version control systems like Git.",
    last_date: "2024-10-15",
    benefits: "Health insurance, 401(k) plan, paid time off.",
    expiry_date: "2024-11-01",
    company_name: "Tech Innovators Inc.",
    active: true,
    salary: "$80,000 - $100,000",
  };

  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <button
        onClick={handleBackClick}
        className="text-blue-600 hover:underline"
      >
        &larr; Back to Listings
      </button>
      <div className="mb-8"></div>

      <div className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>
        <div className="flex items-center mb-4">
          <div className="text-lg font-semibold text-gray-800">
            {job.company_name}
          </div>
          <span className="text-sm text-gray-500 ml-4">
            Expires on: {format(new Date(job.expiry_date), "MMMM dd, yyyy")}
          </span>
        </div>
        <p className="text-gray-700 mb-6">{job.description}</p>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Responsibilities</h2>
          <ul className="list-disc list-inside text-gray-600">
            {job.responsibilities.split(",").map((item, index) => (
              <li key={index} className="mb-2">
                {item.trim()}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Requirements</h2>
          <ul className="list-disc list-inside text-gray-600">
            {job.requirements.split(",").map((item, index) => (
              <li key={index} className="mb-2">
                {item.trim()}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Benefits</h2>
          <p className="text-gray-600">{job.benefits}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Job Details</h2>
          <p className="text-gray-600">
            <strong>Salary:</strong> {job.salary}
          </p>
          <p className="text-gray-600">
            <strong>Last Date to Apply:</strong>{" "}
            {format(new Date(job.last_date), "MMMM dd, yyyy")}
          </p>
          <p className="text-gray-600">
            <strong>Application Expiry Date:</strong>{" "}
            {format(new Date(job.expiry_date), "MMMM dd, yyyy")}
          </p>
          <p
            className={`text-gray-600 ${
              job.active ? "text-green-500" : "text-red-500"
            }`}
          >
            <strong>Status:</strong> {job.active ? "Active" : "Inactive"}
          </p>
        </div>

        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
            Apply Now
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleJob;
