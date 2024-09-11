import { IoMdSearch } from "react-icons/io";
import { GoBriefcase } from "react-icons/go";
import Link from "next/link";
import { getAllJobs } from "@/utils/actions";
import { TbBuildingSkyscraper } from "react-icons/tb";

const CareerPage = async () => {
  const jobs = await getAllJobs(); 

  return (
    <div className="container mx-auto py-8 mt-20">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-8">Career Opportunities</h1>
      </div>

      {/* Job Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.data.map((job) => (
          <div
            key={job.id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex">
              <GoBriefcase className="text-2xl mr-2" />
              <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
            </div>
            <div className="flex">
              {/* <TbBuildingSkyscraper className="mr-2 text-2xl" /> */}
              <p className="text-gray-600 mb-4">{job.company_name}</p>
            </div>
            <p className="text-gray-500 mb-4">
              {job.description.substring(0, 100)}...
            </p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-green-500 font-bold">
                Salary: ${job.salary}
              </span>
              <span className="text-gray-400">Apply by: {job.last_date}</span>
            </div>
            <Link
              href={`/career/${job.id}`}
              className="inline-block text-blue-500 hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerPage;
