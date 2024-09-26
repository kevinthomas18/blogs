import { getContactDetails } from "@/utils/actions";
import Image from "next/image";
import React from "react";

async function Contact() {
  const contact = await getContactDetails();
  console.log(contact);

  return (
    <>
      <div className="m-5 flex flex-col items-center justify-center gap-y-5 bg-gradient-to-r from-blue-500 to-purple-600 p-5 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-white">{contact.data.title}</h1>
        <p className="text-white w-full max-w-[50rem] text-center">
          {contact.data.short_description}
        </p>
      </div>
      <div className="m-5 flex flex-col items-center justify-center gap-y-5 bg-gradient-to-r p-5 rounded-lg">
        <div className="flex flex-col-reverse md:flex-row items-center gap-x-10 max-lg:gap-x-0">
          <div dangerouslySetInnerHTML={{__html:contact.data.top_description}} className="text-black w-full max-w-[50rem] px-4 md:px-0" />
          <Image
            src="/contact2.webp"
            alt="Top Description"
            width={600} 
            height={600} 
            className="object-cover rounded-lg  max-lg:max-w-[350px] md:ml-5"
          />
        </div>
      </div>
      <div className="flex items-center justify-center max-md:justify-start">
        <div className="bg-white shadow-lg border rounded-lg p-10 max-sm:p-5 w-11/12 max-sm:w-full flex flex-col gap-y-5 md:flex-row md:gap-x-10">
          <Image
            src="/contact.jpg"
            height={800}
            width={600}
            alt="Contact"
            className="w-full max-sm:h-[15rem] max-sm:mb-5 md:w-1/2 h-[40rem] object-cover rounded-lg md:rounded-lg"
          />
          <div className="flex-1 p-6 max-sm:p-0">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              {contact.data.title}
            </h2>

            <form
              action="#"
              method="POST"
              className="space-y-8 border border-gray-300 p-4 rounded-md"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="m-5 flex flex-col items-center justify-center gap-y-5 bg-gradient-to-r from-blue-500 to-purple-600 p-5 rounded-lg shadow-lg">
        <div dangerouslySetInnerHTML={{__html:contact.data.bottom_description}} className="text-white w-full max-w-[50rem] text-center" />
      </div>
    </>
  );
}

export default Contact;
