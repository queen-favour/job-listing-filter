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
    <div className="relative  bg-LightGrayishCyan min-h-screen">
      <div
        className="h-40  bg-DesaturatedDarkCyan block lg:hidden"
        style={{ backgroundImage: `url(${header})`, backgroundSize: "cover" }}
      ></div>
      <div
        className="h-40 bg-DesaturatedDarkCyan hidden md:block"
        style={{ backgroundImage: `url(${header2})`, backgroundSize: "cover" }}
      ></div>
      <div className="p-4 md:px-16">
        {selectedFilters.length > 0 && (
          <div className="flex  flex-wrap items-center gap-2 mb-4 p-2 bg-white shadow-lg rounded">
            {selectedFilters.map((filter, index) => (
              <div
                key={index}
                className="flex bg-filterGrayishCyan text-DesaturatedDarkCyan font-semibold px-4 py-2 rounded-lg items-center space-x-2"
              >
                <span>{filter}</span>
                <button
                  className="bg-DesaturatedDarkCyan text-white font-bold rounded-full px-2 py-1"
                  onClick={() => toggleFilter(filter)}
                >
                  X
                </button>
              </div>
            ))}
            <button
              className="text-DesaturatedDarkCyan font-semibold"
              onClick={clearFilters}
            >
              Clear
            </button>
          </div>
        )}
        {filteredItems.length > 0 ? (
          filteredItems.map((job) => (
            <div
              className="bg-white p-4 rounded-lg shadow-lg mb-6 relative md:flex justify-between px-10"
              key={job.id}
            >
              {/* Left Cyan Bar */}
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-DesaturatedDarkCyan"></div>

              {/* Job header */}
              <div className="flex items-center md:gap-4 mb-4">
                <img
                  src={job.logo}
                  alt={job.company}
                  className="w-12 h-12 rounded-full border-2 border-gray-300"
                />
                <div className="flex-1">
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

              {/* Gray Demarcation Line */}
              <div className="border-b-2 border-gray-300 my-4"></div>

              {/* Job role, level, and skills - clickable filters */}
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span
                  className={`cursor-pointer ${
                    selectedFilters.includes(job.role)
                      ? "bg-DesaturatedDarkCyan text-white"
                      : "bg-teal-200 text-teal-800"
                  } px-4 py-2 rounded-full`}
                  onClick={() => toggleFilter(job.role)}
                >
                  {job.role}
                </span>
                <span
                  className={`cursor-pointer ${
                    selectedFilters.includes(job.level)
                      ? "bg-DesaturatedDarkCyan text-white"
                      : "bg-teal-200 text-teal-800"
                  } px-4 py-2 rounded-full`}
                  onClick={() => toggleFilter(job.level)}
                >
                  {job.level}
                </span>
                {job.languages.map((language, index) => (
                  <span
                    key={index}
                    className={`cursor-pointer ${
                      selectedFilters.includes(language)
                        ? "bg-DesaturatedDarkCyan text-white"
                        : "bg-teal-200 text-teal-800"
                    } px-4 py-2 rounded-full`}
                    onClick={() => toggleFilter(language)}
                  >
                    {language}
                  </span>
                ))}
                {job.tools.map((tool, index) => (
                  <span
                    key={index}
                    className={`cursor-pointer ${
                      selectedFilters.includes(tool)
                        ? "bg-DesaturatedDarkCyan text-white"
                        : "bg-teal-200 text-teal-800"
                    } px-4 py-2 rounded-full`}
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
