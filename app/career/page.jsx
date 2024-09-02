"use client";
import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { GoBriefcase } from "react-icons/go";
import Link from "next/link";

const CareerPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample job data
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Innovators Inc.",
      location: "New York, NY",
      description:
        "We are looking for a skilled frontend developer to join our team. You will work on building modern, responsive web applications.",
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Creative Solutions Ltd.",
      location: "San Francisco, CA",
      description:
        "As a product manager, you will oversee the development and launch of new products, ensuring they meet market needs.",
    },
    {
      id: 3,
      title: "Data Analyst",
      company: "Data Insights Corp.",
      location: "Remote",
      description:
        "Join our data team as a data analyst, where you'll work on analyzing data trends and helping businesses make data-driven decisions.",
    },
  ];

  // Filter jobs based on search term
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">Careers</h1>

      {/* Search Bar */}
      <div className="mb-8 relative">
        <input
          type="text"
          placeholder="Search for jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <IoMdSearch className="absolute top-2 right-3 text-gray-500 text-2xl" />
      </div>

      {/* Job Listings */}
      <div className="space-y-8">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Link
              href={`/career/${job.id}`}
              key={job.id}
              className="border border-gray-300 rounded-lg p-6 flex items-start space-x-4 cursor-pointer"
            >
              <div className="flex-1">
                <div className="flex">
                  <GoBriefcase className="text-gray-700 text-3xl mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    {job.title}
                  </h2>
                </div>

                <p className="mb-4">
                  <span className="inline-block px-4 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg">
                    {job.company} • {job.location}
                  </span>
                </p>
                <p className="text-gray-700 text-sm mb-4">{job.description}</p>

                <div className="flex space-x-4">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                    Apply Now
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300">
                    Save
                  </button>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-600">No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default CareerPage;
