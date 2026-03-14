import { useNavigate } from 'react-router';

function ProfilePage() {
  const navigate = useNavigate()

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p className="mb-4">Your appointments</p>
      <button
        className="text-blue-500 underline"
        onClick={() => navigate('/')}
      >
        Home
      </button>
    </div>
  )
}

export default ProfilePage
