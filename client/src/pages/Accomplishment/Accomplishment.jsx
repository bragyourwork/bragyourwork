import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddAccomplishment from '../../components/AddAccomplishment';
import MyAccomplishments from '../../components/MyAccomplishments';

function Accomplishment() {
  const [view, setView] = useState('add');

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <aside className="w-full md:w-1/4 bg-neutral-100 text-black p-6">
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setView('add')}
              className={`w-full p-3 text-left rounded-lg transition duration-200 ${
                view === 'add' ? 'bg-darkgray text-white' : 'bg-neutral-100 text-black border border-black hover:bg-darkgray hover:text-white'
              }`}
            >
              Add Accomplishment
            </button>
          </li>
          <li>
            <button
              onClick={() => setView('my')}
              className={`w-full p-3 text-left rounded-lg transition duration-200 ${
                view === 'my' ? 'bg-darkgray text-white' : 'bg-neutral-100 text-black border border-black hover:bg-darkgray hover:text-white'
              }`}
            >
              My Accomplishments
            </button>
          </li>
          <li>
            <Link
              to="/showcase"
              className="w-full p-3 text-left rounded-lg bg-neutral-100 text-black border border-black hover:bg-darkgray hover:text-white transition duration-200"
            >
              My Showcase
            </Link>
          </li>
        </ul>
      </aside>
      <main className="w-full md:w-3/4 p-8 bg-white shadow-md">
        {view === 'add' && <AddAccomplishment />}
        {view === 'my' && <MyAccomplishments />}
      </main>
    </div>
  );
}

export default Accomplishment;
