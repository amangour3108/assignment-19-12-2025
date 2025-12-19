import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

const Admin = () => {
  const [project, setProject] = useState({ name: "", description: "" });
  const [image, setImage] = useState(null);

  const [client, setClient] = useState({
    name: "",
    designation: "",
    description: "",
  });
  const [clientImage, setClientImage] = useState(null);

  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    API.get("/contact").then(res => setContacts(res.data));
    API.get("/subscribe").then(res => setSubscribers(res.data));
    API.get("/clients").then(res => setClients(res.data));
  }, []);

  const submitProject = async () => {
    const data = new FormData();
    data.append("name", project.name);
    data.append("description", project.description);
    data.append("image", image);

    await API.post("/projects", data);
    alert("🚀 Project added successfully!");
  };

  const submitClient = async () => {
    const data = new FormData();
    data.append("name", client.name);
    data.append("designation", client.designation);
    data.append("description", client.description);
    data.append("image", clientImage);

    await API.post("/clients", data);
    alert("✅ Client added successfully!");
  };

  return (
    <section className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Link
                to="/"
                className="p-2 bg-white border rounded-lg hover:bg-gray-50"
              >
                ←
              </Link>
              <h1 className="text-4xl font-black">Dashboard</h1>
            </div>
            <p className="text-gray-500 ml-12">Manage your projects and leads</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT COLUMN */}
          <div className="space-y-6">

            {/* ADD PROJECT */}
            <div className="bg-white p-8 rounded-3xl border">
              <h3 className="text-lg font-bold mb-6">Add New Project</h3>

              <input
                className="w-full bg-gray-50 border p-3 rounded-xl mb-3"
                placeholder="Project Name"
                onChange={e => setProject({ ...project, name: e.target.value })}
              />

              <textarea
                className="w-full bg-gray-50 border p-3 rounded-xl mb-3"
                placeholder="Description"
                onChange={e =>
                  setProject({ ...project, description: e.target.value })
                }
              />

              <input
                type="file"
                className="mb-4"
                onChange={e => setImage(e.target.files[0])}
              />

              <button
                onClick={submitProject}
                className="w-full bg-gray-900 text-white py-3 rounded-xl"
              >
                Publish Project
              </button>
            </div>

            {/* ADD HAPPY CLIENT */}
            <div className="bg-white p-8 rounded-3xl border">
              <h3 className="text-lg font-bold mb-6">Add Happy Client</h3>

              <input
                className="w-full bg-gray-50 border p-3 rounded-xl mb-3"
                placeholder="Client Name"
                onChange={e => setClient({ ...client, name: e.target.value })}
              />

              <input
                className="w-full bg-gray-50 border p-3 rounded-xl mb-3"
                placeholder="Designation"
                onChange={e =>
                  setClient({ ...client, designation: e.target.value })
                }
              />

              <textarea
                className="w-full bg-gray-50 border p-3 rounded-xl mb-3"
                placeholder="Client Description"
                onChange={e =>
                  setClient({ ...client, description: e.target.value })
                }
              />

              <input
                type="file"
                className="mb-4"
                onChange={e => setClientImage(e.target.files[0])}
              />

              <button
                onClick={submitClient}
                className="w-full bg-green-600 text-white py-3 rounded-xl"
              >
                Add Client
              </button>
            </div>

            {/* NEWSLETTER */}
            <div className="bg-gray-900 p-8 rounded-3xl text-white">
              <h3 className="font-bold mb-4">Newsletter Subscribers</h3>
              {subscribers.map(s => (
                <p key={s._id} className="text-sm">
                  {s.email}
                </p>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-2 bg-white rounded-3xl border">
            <h3 className="p-6 font-bold">Contact Inquiries</h3>

            {contacts.length === 0 && (
              <p className="p-6 text-gray-400">No inquiries yet.</p>
            )}

            {contacts.map(c => (
              <div
                key={c._id}
                className="border-t p-6 flex justify-between"
              >
                <div>
                  <p className="font-bold">{c.fullName}</p>
                  <p className="text-sm">{c.email}</p>
                </div>
                <span className="text-sm">{c.city}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Admin;
