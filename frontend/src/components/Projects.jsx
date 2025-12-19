import { useEffect, useState } from "react";
import API from "../services/api";
import { FaBriefcase } from "react-icons/fa";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    API.get("/projects").then(res => setProjects(res.data));
  }, []);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          Our Masterpieces
        </h2>
        <div className="h-1 w-20 bg-blue-600 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map(p => (
          <div
            key={p._id}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            {/* Icon Header */}
            <div className="h-64 bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
              <FaBriefcase className="text-blue-600 text-7xl group-hover:scale-110 transition-transform duration-300" />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800">
                {p.name}
              </h3>
              <p className="text-gray-600 mt-2 line-clamp-2">
                {p.description}
              </p>

              <button className="mt-4 font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-2">
                View Project <span>→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
