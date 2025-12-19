import { useState } from "react";
import API from "../services/api";

const ContactForm = () => {
  const [form, setForm] = useState({ fullName: "", email: "", mobile: "", city: "" });

  const submitHandler = async e => {
    e.preventDefault();
    await API.post("/contact", form);
    alert("Message Sent Successfully!");
    setForm({ fullName: "", email: "", mobile: "", city: "" });
  };

  return (
    <section className="py-20 px-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-2">Let's Build Together</h2>
          <p className="text-gray-500 mb-8">Fill out the form and our team will get back to you within 24 hours.</p>

          <form onSubmit={submitHandler} className="grid md:grid-cols-2 gap-6">
            {Object.keys(form).map(key => (
              <div key={key} className="flex flex-col">
                <label className="capitalize text-sm font-semibold mb-2 text-gray-700">{key.replace(/([A-Z])/g, ' $1')}</label>
                <input
                  placeholder={`Your ${key}`}
                  value={form[key]}
                  onChange={e => setForm({ ...form, [key]: e.target.value })}
                  className="bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>
            ))}
            <button className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;