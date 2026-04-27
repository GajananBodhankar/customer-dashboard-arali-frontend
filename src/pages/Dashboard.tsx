import { useEffect, useMemo, useState } from "react";
import CustomerList from "../components/CustomerList";
import EditProfileModal from "../components/EditProfileModal";
import Pagination from "../components/Pagination";
import ProfileCard from "../components/ProfileCard";
import { useCurrentUserContext } from "../Context/CurrentUserContextValue";
import { getCustomers, updateCustomer } from "../services/api";
import type { CustomerForm, iCurrentUser } from "../services/propTypes";

interface DashboardProps {
  token: string;
}

const ITEMS_PER_PAGE = 5;

export default function Dashboard({ token }: DashboardProps) {
  const [customers, setCustomers] = useState<iCurrentUser[]>([]);
  const { currentUser, setCurrentUser } = useCurrentUserContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCustomers(token);
        setCustomers(data);
      } catch {
        setCustomers([]);
      }
    };

    fetchData();
  }, [token, currentUser]);

  const pageCount = Math.ceil(customers.length / ITEMS_PER_PAGE);
  const visiblePage = Math.min(currentPage, pageCount || 1);
  const paginatedCustomers = useMemo(() => {
    const startIndex = (visiblePage - 1) * ITEMS_PER_PAGE;
    return customers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [visiblePage, customers, currentUser]);

  const handleSaveProfile = async (form: CustomerForm) => {
    if (!currentUser.id) {
      alert("Unable to update account without a customer id.");
      return;
    }

    setIsSaving(true);

    try {
      const updatedUser = await updateCustomer(currentUser.id, form, token);
      const nextUser = { ...currentUser, ...form, ...updatedUser };
      setCurrentUser(nextUser);
      localStorage.setItem("currentUser", JSON.stringify(nextUser));
      setModalVisible(false);
    } catch {
      alert("Unable to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h2 className="text-2xl font-bold mb-4">User</h2>
      <ProfileCard currentUser={currentUser} onEdit={() => setModalVisible(true)} />

      <h2 className="text-2xl font-bold my-4">Customers</h2>
      <CustomerList customers={paginatedCustomers} />
      <Pagination currentPage={visiblePage} pageCount={pageCount} onPageChange={setCurrentPage} />

      {modalVisible && (
        <EditProfileModal
          currentUser={currentUser}
          isSaving={isSaving}
          onClose={() => setModalVisible(false)}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  );
}
