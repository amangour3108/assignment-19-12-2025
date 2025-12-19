import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Added Link import
import API from "../services/api";

const Admin = () => {
  const [project, setProject] = useState({ name: "", description: "" });
  const [image, setImage] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    API.get("/contact").then(res => setContacts(res.data));
    API.get("/subscribe").then(res => setSubscribers(res.data));
  }, []);

  const submitProject = async () => {
    const data = new FormData();
    data.append("name", project.name);
    data.append("description", project.description);
    data.append("image", image);

    await API.post("/projects", data);
    alert("🚀 Project added successfully!");
  };

  return (
    <section className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section with Back Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Link 
                to="/" 
                className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm group"
                title="Back to Home"
              >
                <span className="block group-hover:-translate-x-1 transition-transform text-gray-600">←</span>
              </Link>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">Dashboard</h1>
            </div>
            <p className="text-gray-500 ml-12">Manage your projects and leads</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="hidden md:block text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors"
            >
              View Live Site
            </Link>
            <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-xl shadow-blue-200">
              A
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COL: ADD PROJECT FORM */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
                Add New Project
              </h3>

              <div className="space-y-4">
                <input
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Project Name"
                  onChange={e => setProject({ ...project, name: e.target.value })}
                />
                <textarea
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-25"
                  placeholder="Short Description"
                  onChange={e => setProject({ ...project, description: e.target.value })}
                />
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Cover Image</label>
                  <input
                    type="file"
                    className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                    onChange={e => setImage(e.target.files[0])}
                  />
                </div>
                <button
                  onClick={submitProject}
                  className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-blue-600 transition-all mt-4 shadow-lg shadow-gray-200 active:scale-[0.98]"
                >
                  Publish Project
                </button>
              </div>
            </div>

            {/* NEWSLETTER MINI-CARD */}
            <div className="bg-gray-900 p-8 rounded-3xl text-white shadow-xl shadow-gray-300">
              <h3 className="text-lg font-bold mb-4 flex items-center justify-between">
                Newsletter
                <span className="text-[10px] bg-blue-600 px-2 py-1 rounded text-white uppercase tracking-widest">Active</span>
              </h3>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {subscribers.map(s => (
                  <div key={s._id} className="bg-white/10 p-3 rounded-lg text-sm font-medium border border-white/5 hover:bg-white/20 transition-colors">
                    {s.email}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COL: SUBMISSIONS TABLE */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Contact Inquiries</h3>
                <span className="text-xs font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                  {contacts.length} Total
                </span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50/50 text-gray-400 text-xs uppercase tracking-widest font-bold">
                      <th className="px-8 py-4">Client</th>
                      <th className="px-8 py-4">Contact Info</th>
                      <th className="px-8 py-4">Location</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {contacts.map(c => (
                      <tr key={c._id} className="hover:bg-blue-50/30 transition-colors">
                        <td className="px-8 py-5">
                          <span className="font-bold text-gray-800 block">{c.fullName}</span>
                        </td>
                        <td className="px-8 py-5">
                          <span className="text-gray-600 block text-sm">{c.email}</span>
                          <span className="text-gray-400 block text-xs">{c.mobile}</span>
                        </td>
                        <td className="px-8 py-5">
                          <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600">
                            {c.city}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {contacts.length === 0 && (
                <div className="p-20 text-center text-gray-400 italic">
                  No inquiries yet.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Admin;