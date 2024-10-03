import React, { useState } from "react";
import { data } from "../data";

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
    <div className="p-4  min-h-screen">
      <div></div>
      <div className="bg-LightGrayishCyan">
        {selectedFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-4 p-2 bg-white shadow-lg rounded">
            {selectedFilters.map((filter, index) => (
              <div
                key={index}
                className="bg-filterGrayishCyan text-DesaturatedDarkCyan font-semibold px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <span>{filter}</span>
                <button
                  className="bg-DesaturatedDarkCyan text-white w-6 font-semibold"
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
              Clear All Filters
            </button>
          </div>
        )}

        {filteredItems.length > 0 ? (
          filteredItems.map((job) => (
            <div
              className="bg-white p-4 rounded-lg shadow-lg mb-6"
              key={job.id}
            >
              <div className="flex items-center mb-4">
                <img
                  src={job.logo}
                  alt={job.company}
                  className="w-12 h-12 mr-4"
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
