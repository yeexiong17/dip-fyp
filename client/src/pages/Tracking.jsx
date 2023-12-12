import React, { useState } from 'react';
import NavAfter from "../components/NavAfter";
import Nav from '../components/Nav';

function Tracking() {
  const [showDetails, setShowDetails] = useState(null);

  const viewDetails = (id) => {
    setShowDetails(id);
  };

  const closeDetails = () => {
    setShowDetails(null);
  };

  const events = [
    {
      id: 1,
      name: 'Event 1',
      date: '2023-11-25',
      status: 'In Progress',
      venue: 'Conference Center',
      category: 'Power failure',
    },
    {
      id: 2,
      name: 'Event 2',
      date: '2023-12-01',
      status: 'Completed',
      venue: 'Exhibition Hall',
      category: 'Building',
    },
  ];

  return (
    <div>
      <Nav />
      <div className="pt-16 bg-gray-100 h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-md shadow-md w-full h-full lg:py-12 lg:px-16 md:py-12 md:px-6">
          <h2 className="text-2xl font-semibold mb-10">Tracking Log</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="py-2 text-center">ID</th>
                <th className="py-2 text-center">Name</th>
                <th className="py-2 text-center">Date</th>
                <th className="py-2 text-center">Status</th>
                <th className="py-2 text-center">Venue</th>
                <th className="py-2 text-center">Category</th>
                <th className="py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td className="py-2 text-center">{event.id}</td>
                  <td className="py-2 text-center">{event.name}</td>
                  <td className="py-2 text-center">{event.date}</td>
                  <td className="py-2 text-center">
                    <span className="text-gray-600">{event.status}</span>
                  </td>
                  <td className="py-2 text-center">{event.venue}</td>
                  <td className="py-2 text-center">{event.category}</td>
                  <td className="py-2 text-center">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => viewDetails(event.id)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-md shadow-md w-96">
              <h2 className="text-2xl font-semibold mb-4">Event Details</h2>
              <table className="min-w-full">
                <tbody>
                  <tr className="" >
                    <td className="font-semibold">ID:</td>
                    <td>{events.find((event) => event.id === showDetails)?.id}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Name:</td>
                    <td>{events.find((event) => event.id === showDetails)?.name}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Date:</td>
                    <td>{events.find((event) => event.id === showDetails)?.date}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Status:</td>
                    <td>{events.find((event) => event.id === showDetails)?.status}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Venue:</td>
                    <td>{events.find((event) => event.id === showDetails)?.venue}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Category:</td>
                    <td>{events.find((event) => event.id === showDetails)?.category}</td>
                  </tr>
                </tbody>
              </table>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                onClick={closeDetails}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tracking;