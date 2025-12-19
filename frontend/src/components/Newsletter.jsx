import { useState } from "react";
import API from "../services/api";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const submitHandler = async () => {
    if(!email) return;
    await API.post("/subscribe", { email });
    alert("Welcome to the community!");
    setEmail("");
  };

  return (
    <section className="px-6 py-12">
      <div className="max-w-7xl mx-auto bg-gray-900 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden">
        {/* Background Decorative Circles */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-600 blur-[100px] opacity-20"></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Stay in the Loop</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">Get the latest project updates and design trends delivered to your inbox.</p>

          <div className="flex flex-col md:flex-row gap-4 justify-center max-w-lg mx-auto">
            <input
              className="flex-1 px-6 py-4 rounded-full text-white outline-none focus:ring-4 focus:ring-blue-500/30"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button onClick={submitHandler} className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-full transition-all">
              Join Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;