import React, { useEffect, useState } from 'react';
import Nav from '../../../components/Nav';
import { useAuthContext } from '../../../MyContext';

function Tracking() {

  const [reportData, setReportData] = useState([])
  const [showDetails, setShowDetails] = useState(null)

  const { userProfile } = useAuthContext()

  const viewDetails = (report) => {
    setShowDetails(report);
  };

  const closeDetails = () => {
    setShowDetails(null);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:8000/user/report/${userProfile.user_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'

        });

        if (response.ok) {
          const responseJson = await response.json();
          setReportData(responseJson.result);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

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
                <th className="py-2 text-center">Category</th>
                <th className="py-2 text-center">Venue</th>
                <th className="py-2 text-center">Status</th>
                <th className="py-2 text-center">Date</th>
                <th className="py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                reportData.length == 0
                  ? <tr>
                    <td colSpan={6}>
                      <p className='mt-4 text-xl text-center'>Nothing to be tracked yet...</p>
                    </td>
                  </tr>
                  : reportData.map((report) => (
                    <tr key={report.report_id}>
                      <td className="py-2 text-center">{report.report_id}</td>
                      <td className="py-2 text-center">{report.report_category}</td>
                      <td className="py-2 text-center">{report.report_venue}</td>
                      <td className="py-2 text-center">
                        <span className="text-gray-600">{report.report_status}</span>
                      </td>
                      <td className="py-2 text-center">{report.report_created_date.toString().split('T')[0]}</td>
                      <td className="py-2 text-center">
                        <button
                          className="bg-orange-500 text-white px-4 py-2 rounded"
                          onClick={() => viewDetails(report)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
        </div>

        {showDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-md shadow-md w-96">
              <h2 className="text-2xl font-semibold mb-4">Report Details</h2>
              <table className="min-w-full table-fixed">
                <tbody>
                  <tr>
                    <td className="font-semibold w-28">ID<span className='float-right'>:</span></td>
                    <td className='pl-2'>{showDetails.report_id}</td>
                  </tr>
                  {/* <tr>
                    <td className="font-semibold">Name:</td>
                    <td>{events.find((event) => event.id === showDetails)?.name}</td>
                  </tr> */}
                  <tr>
                    <td className="font-semibold w-28">Date<span className='float-right'>:</span></td>
                    <td className='pl-2'>{showDetails.report_created_date.toString().split('T')[0]}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold w-28">Status<span className='float-right'>:</span></td>
                    <td className='pl-2'>{showDetails.report_status}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold w-28">Category<span className='float-right'>:</span></td>
                    <td className='pl-2'>{showDetails.report_category}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold w-28">Venue<span className='float-right'>:</span></td>
                    <td className='pl-2'>{showDetails.report_venue}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold w-28">Level<span className='float-right'>:</span></td>
                    <td className='pl-2'>{showDetails.report_level}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold w-28">Room<span className='float-right'>:</span></td>
                    <td className='pl-2'>{showDetails.report_room}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold w-28" valign='top'>Description<span className='float-right'>:</span></td>
                    <td className='pl-2'>{showDetails.report_description}</td>
                  </tr>
                </tbody>
              </table>
              <button
                className="bg-orange-500 text-white px-4 py-2 rounded mt-4"
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