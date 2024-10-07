import React, { useState } from "react";
import { data } from "../data";
import header from "../assets/images/bg-header-mobile.svg";
import header2 from "../assets/images/bg-header-desktop.svg";

const JobListing = () => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState(data);

  const toggleFilter = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((item) => item !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };
  const clearFilters = () => {
    setSelectedFilters([]);
  };
  React.useEffect(() => {
    if (selectedFilters.length === 0) {
      setFilteredItems(data);
    } else {
      const updatedJobs = data.filter((job) =>
        selectedFilters.every(
          (filter) =>
            job.role.toLowerCase().includes(filter.toLowerCase()) ||
            job.level.toLowerCase().includes(filter.toLowerCase()) ||
            job.languages.some((language) =>
              language.toLowerCase().includes(filter.toLowerCase())
            ) ||
            job.tools.some((tool) =>
              tool.toLowerCase().includes(filter.toLowerCase())
            )
        )
      );
      setFilteredItems(updatedJobs);
    }
  }, [selectedFilters]);

  return (
    <div className="relative bg-LightGrayishCyan min-h-screen">
      <div
        className="h-40 bg-DesaturatedDarkCyan block lg:hidden"
        style={{ backgroundImage: `url(${header})`, backgroundSize: "cover" }}
      ></div>

      <div
        className="h-40 bg-DesaturatedDarkCyan hidden lg:block"
        style={{ backgroundImage: `url(${header2})`, backgroundSize: "cover" }}
      ></div>
      {selectedFilters.length > 0 && (
        <div className="relative z-10 -mt-10 mx-4 md:mx-16 mb-6 p-4 bg-white shadow-xl rounded-lg flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap gap-2">
            {selectedFilters.map((filter, index) => (
              <div key={index} className="flex">
                <span className="flex  bg-filterGrayishCyan text-DesaturatedDarkCyan font-semibold px-4 py-2 rounded-l-lg items-center space-x-2">
                  {filter}
                </span>
                <button
                  className="bg-DesaturatedDarkCyan text-white font-bold  px-4 py-2 rounded-r-lg transition duration-300 hover:bg-black"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => toggleFilter(filter)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <button
            className="text-xl ml-auto text-DesaturatedDarkCyan font-semibold hover:underline"
            onClick={clearFilters}
          >
            Clear
          </button>
        </div>
      )}
      <div className="p-4 md:px-16">
        {filteredItems.length > 0 ? (
          filteredItems.map((job) => (
            <div
              className="bg-white p-4 py-12 rounded-lg shadow-lg mb-10 relative lg:flex justify-between px-10 lg:p-4"
              key={job.id}
            >
              <div className="absolute rounded-tl-md rounded-bl-md left-0 top-0 bottom-0 w-2 bg-DesaturatedDarkCyan"></div>
              <div className="flex items-center gap-4 md:gap-4 mb-4 relative lg:gap-0">
                <img
                  src={job.logo}
                  alt={job.company}
                  className="w-20 h-20 rounded-full border-gray-300 absolute -top-9 left-0 transform -translate-y-1/2 lg:static lg:translate-y-0 lg:top-auto lg:left-auto" // This moves the logo upwards
                />
                <div className="flex-1 text-lg pl-16">
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-bold text-DesaturatedDarkCyan">
                      {job.company}
                    </h3>
                    {job.new && (
                      <span className="bg-teal-500 text-white text-xs font-bold px-2 py-1 ml-2 rounded-full">
                        NEW!
                      </span>
                    )}
                    {job.featured && (
                      <span className="bg-gray-800 text-white text-xs font-bold px-2 py-1 ml-2 rounded-full">
                        FEATURED
                      </span>
                    )}
                  </div>
                  <h4 className="text-gray-700 font-semibold">
                    {job.position}
                  </h4>
                  <div className="text-gray-500 text-sm">
                    <span>{job.postedAt}</span> • <span>{job.contract}</span> •{" "}
                    <span>{job.location}</span>
                  </div>
                </div>
              </div>

              <div className="border-b-2 border-gray-300 my-4"></div>
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span
                  className="bg-filterGrayishCyan cursor-pointer hover:bg-DesaturatedDarkCyan hover:text-white text-DesaturatedDarkCyan px-4 py-2 rounded font-bold text-lg"
                  onClick={() => toggleFilter(job.role)}
                >
                  {job.role}
                </span>
                <span
                  className="bg-filterGrayishCyan cursor-pointer hover:bg-DesaturatedDarkCyan hover:text-white text-DesaturatedDarkCyan px-4 py-2 rounded font-bold text-lg"
                  onClick={() => toggleFilter(job.level)}
                >
                  {job.level}
                </span>
                {job.languages.map((language, index) => (
                  <span
                    key={index}
                    className="bg-filterGrayishCyan cursor-pointer hover:bg-DesaturatedDarkCyan hover:text-white text-DesaturatedDarkCyan px-4 py-2 rounded font-bold text-lg"
                    onClick={() => toggleFilter(language)}
                  >
                    {language}
                  </span>
                ))}
                {job.tools.map((tool, index) => (
                  <span
                    key={index}
                    className="bg-filterGrayishCyan cursor-pointer hover:bg-DesaturatedDarkCyan hover:text-white text-DesaturatedDarkCyan px-4 py-2 rounded font-bold text-lg"
                    onClick={() => toggleFilter(tool)}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No jobs found matching the criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default JobListing;
