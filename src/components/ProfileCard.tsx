import type { iCurrentUser } from "../services/propTypes";

interface ProfileCardProps {
  currentUser: iCurrentUser;
  onEdit: () => void;
}

export default function ProfileCard({ currentUser, onEdit }: ProfileCardProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-semibold">{currentUser.name || "No name added"}</p>
        <p className="text-gray-600">{currentUser.email || "No email added"}</p>
        <p className="text-gray-500">{currentUser.phone || "No phone added"}</p>
      </div>

      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={onEdit}>
        Edit
      </button>
    </div>
  );
}
