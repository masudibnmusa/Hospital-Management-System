import { useState, useMemo } from 'react';
import { useStaff } from '../hooks/useStaff.js';
import StaffForm from '../components/staff/StaffForm.jsx';
import StaffList from '../components/staff/StaffList.jsx';
import DutyRoster from '../components/staff/DutyRoster.jsx';
import StaffSearch from '../components/staff/StaffSearch.jsx';
import Modal from '../components/common/Modal.jsx';
import ConfirmDialog from '../components/common/ConfirmDialog.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { Plus, UserCog } from 'lucide-react';
import { STAFF_ROLES } from '../utils/constants.js';

const StaffPage = () => {
  const { staff, loading, addStaff, updateStaff, deleteStaff } = useStaff();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [deletingMember, setDeletingMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [view, setView] = useState('list');

  const filteredStaff = useMemo(() => {
    let result = staff;
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(s => s.name?.toLowerCase().includes(lower));
    }
    if (filterRole) {
      result = result.filter(s => s.role === filterRole);
    }
    return result;
  }, [staff, searchTerm, filterRole]);

  const handleAdd = async (data) => { await addStaff(data); setIsModalOpen(false); };
  const handleEdit = async (data) => { await updateStaff(editingMember.id, data); setEditingMember(null); setIsModalOpen(false); };
  const handleDelete = async () => { await deleteStaff(deletingMember.id); setDeletingMember(null); };
  const handleShiftUpdate = async (id, shift) => { await updateStaff(id, { shift }); };

  const openAdd = () => { setEditingMember(null); setIsModalOpen(true); };
  const openEdit = (member) => { setEditingMember(member); setIsModalOpen(true); };

  if (loading && staff.length === 0) return <LoadingSpinner fullScreen />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <UserCog size={28} className="text-hospital-600" />
            Staff Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Manage hospital staff and duty rosters</p>
        </div>
        <div className="flex gap-2">
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button onClick={() => setView('list')} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${view === 'list' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}>List</button>
            <button onClick={() => setView('roster')} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${view === 'roster' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}>Duty Roster</button>
          </div>
          <button onClick={openAdd} className="btn-primary flex items-center gap-2">
            <Plus size={18} /> Add Staff
          </button>
        </div>
      </div>

      {view === 'list' && (
        <>
          <StaffSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} filterRole={filterRole} onRoleChange={setFilterRole} roles={STAFF_ROLES} />
          {filteredStaff.length === 0 ? (
            <EmptyState title="No staff found" description="Add staff members to your team." />
          ) : (
            <StaffList staff={filteredStaff} onEdit={openEdit} onDelete={setDeletingMember} />
          )}
        </>
      )}

      {view === 'roster' && <DutyRoster staff={filteredStaff} onUpdateShift={handleShiftUpdate} />}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingMember ? 'Edit Staff' : 'Add New Staff'}>
        <StaffForm initialData={editingMember} onSubmit={editingMember ? handleEdit : handleAdd} onCancel={() => setIsModalOpen(false)} />
      </Modal>

      <ConfirmDialog
        isOpen={!!deletingMember}
        onClose={() => setDeletingMember(null)}
        onConfirm={handleDelete}
        title="Delete Staff Member"
        message={`Remove ${deletingMember?.name} from the system?`}
        danger
      />
    </div>
  );
};

export default StaffPage;
