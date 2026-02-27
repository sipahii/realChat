import { useState } from "react";
import { CreateUser } from "./create";
import { EditUser } from "./edit";
import { Table } from "./table";

export const UserDetails = () => {
  const [step, setStep] = useState(1); // 1: table, 2: create, 3: edit
  const [selectedUser, setSelectedUser] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setStep(3);
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setStep(2);
  };

  const handleEditSuccess = () => {
    setSelectedUser(null);
    setStep(1);
    setRefreshTrigger((t) => t + 1);
  };

  const handleEditCancel = () => {
    setSelectedUser(null);
    setStep(1);
  };

  const handleCreateSuccess = () => {
    setStep(1);
    setRefreshTrigger((t) => t + 1);
  };

  const handleCreateCancel = () => {
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-6">
      {step === 1 && (
        <Table
          onEditUser={handleEditUser}
          onCreateUser={handleCreateUser}
          refreshTrigger={refreshTrigger}
        />
      )}
      {step === 2 && (
        <CreateUser onSuccess={handleCreateSuccess} onCancel={handleCreateCancel} />
      )}
      {step === 3 && selectedUser && (
        <EditUser
          user={selectedUser}
          onSuccess={handleEditSuccess}
          onCancel={handleEditCancel}
        />
      )}
    </div>
  );
};

export default UserDetails;
