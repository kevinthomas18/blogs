import { getJobDetail } from "@/utils/actions";

const SingleJob = async ({ params }) => {
  const jobDetail = await getJobDetail(params.slug);

  const {
    title,
    description,
    responsibilities,
    requirements,
    benefits,
    last_date,
    company_name,
    salary,
    expiry_date,
  } = jobDetail.data;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 ">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-gray-600 mb-4">{company_name}</p>
        <p className="text-gray-500 mb-4">Salary: ${salary}</p>
        <p className="text-gray-500 mb-4">Apply by: {last_date}</p>
        <p className="text-gray-500 mb-4">Expires on: {expiry_date}</p>
        <div
          className="prose lg:prose-xl"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-2">Responsibilities</h2>
        <div
          className="prose lg:prose-xl"
          dangerouslySetInnerHTML={{ __html: responsibilities }}
        ></div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-2">Requirements</h2>
        <div
          className="prose lg:prose-xl"
          dangerouslySetInnerHTML={{ __html: requirements }}
        ></div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-2">Benefits</h2>
        <div
          className="prose lg:prose-xl"
          dangerouslySetInnerHTML={{ __html: benefits }}
        ></div>
      </div>
    </div>
  );
};

export default SingleJob;
