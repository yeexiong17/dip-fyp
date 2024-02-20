import React, { useEffect, useState } from 'react'
import { jsPDF } from 'jspdf'

import Nav from '../../../components/Nav'
import { useAuthContext } from '../../../MyContext'

function Tracking() {

  const [reportData, setReportData] = useState([])
  const [showDetails, setShowDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { userProfile } = useAuthContext()

  const viewDetails = (report) => {
    setShowDetails(report)
  }

  const closeDetails = () => {
    setShowDetails(null)
  }

  const generatePdf = async (report) => {
    const doc = new jsPDF()

    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:8000/user/firebase-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          makeImage: report.report_image,
          completeImage: report.report_completed_image
        }),
        credentials: 'include'
      })

      if (response.ok) {
        const responseJson = await response.json()
        doc.addImage(responseJson.makeImage, 'JPEG', 10, 100, 80, 80)
        doc.addImage(responseJson.completeImage, 'JPEG', 10, 200, 80, 80)
      }
      else {
        return alert('Unable to generate PDF')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }

    doc.setFontSize(28); // Set font size to 24
    doc.setFont('helvetica', 'bold'); // Set font to bold
    doc.setTextColor(255, 127, 22); // Set text color to orange
    doc.text('Resolve', 10, 15);

    // Reset font size, style, and color
    doc.setFontSize(12); // Reset font size
    doc.setFont('helvetica', 'normal'); // Reset font style
    doc.setTextColor(0, 0, 0); // Reset text color

    // Add other information
    doc.setFont('helvetica', 'bold'); // Set font to bold
    doc.text('ID                 :', 10, 30);
    doc.text('Room                :', 120, 30);
    doc.text('Category     :', 10, 40);
    doc.text('Level                 :', 120, 40);
    doc.text('Venue          :', 10, 50);
    doc.text('Created Date    :', 120, 50);

    // Reset font style
    doc.setFont('helvetica', 'normal'); // Reset font style

    // Add data
    doc.text(`${report.report_id}`, 38, 30);
    doc.text(`${report.report_room}`, 155, 30);
    doc.text(`${report.report_category}`, 38, 40);
    doc.text(`${report.report_level}`, 155, 40);
    doc.text(`${report.report_venue}`, 38, 50);
    doc.text(`${new Date(report.report_created_date).toLocaleDateString('en-GB')}`, 155, 50);

    // Add a line to separate sections
    doc.line(10, 60, 200, 60);

    // Add Description title
    doc.setFont('helvetica', 'bold'); // Set font to bold
    doc.text('Description:', 10, 70);

    // Reset font style
    doc.setFont('helvetica', 'normal'); // Reset font style

    // Add Description content
    doc.text('This is a description words.', 10, 76);

    // Add Report Image title
    doc.setFont('helvetica', 'bold'); // Set font to bold
    doc.text('Report Image:', 10, 96);

    // Reset font style
    doc.setFont('helvetica', 'normal'); // Reset font style

    // Add Completed Image title
    doc.setFont('helvetica', 'bold'); // Set font to bold
    doc.text('Completed Image:', 10, 196);

    // Reset font style
    doc.setFont('helvetica', 'normal'); // Reset font style

    // Save the PDF
    doc.save('Resolve-Report.pdf');
  }

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
              {
                showDetails.report_status == 'Completed'
                  ? <button
                    className="bg-transparent text-orange-500 border border-orange-500 hover:shadow-xl w-30 h-10 px-4 py-2 rounded mt-4 mr-4"
                    onClick={() => generatePdf(showDetails)}
                  >
                    {
                      isLoading
                        ? <span className="loading loading-spinner loading-md"></span>

                        : 'Generate PDF'
                    }
                  </button>
                  : null
              }
              <button
                className={`${isLoading ? 'bg-neutral-300' : 'bg-orange-500'} text-white w-18 h-10 px-4 py-2 rounded mt-4`}
                onClick={() => closeDetails()}
                disabled={isLoading ? true : false}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div >
  );
}

export default Tracking;