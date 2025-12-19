import { useEffect, useState } from "react";
import API from "../services/api";

const Clients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    API.get("/clients").then(res => setClients(res.data));
  }, []);

  return (
    <section className="py-20 bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">What Our Clients Say</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {clients.map(c => (
            <div key={c._id} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative">
              <div className="text-blue-500 text-4xl absolute top-4 right-8 opacity-20 font-serif">“</div>
              <p className="text-gray-600 italic mb-6">"{c.description}"</p>
              <div className="flex items-center gap-4">
                <img src={c.image} className="h-14 w-14 rounded-full object-cover ring-4 ring-blue-50" alt={c.name} />
                <div>
                  <h4 className="font-bold text-gray-900 leading-none">{c.name}</h4>
                  <span className="text-sm text-gray-500 uppercase tracking-wider">{c.designation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;