import { useNavigate } from 'react-router';

function BookingPage() {
  const navigate = useNavigate()

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Booking</h1>
      <p className="mb-4">Select a service and time</p>
      <button
        className="text-blue-500 underline"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
    </div>
  )
}

export default BookingPage
