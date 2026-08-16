import SearchBar from '../common/SearchBar.jsx';

const PatientFilters = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="flex gap-4 items-center">
      <div className="flex-1">
        <SearchBar value={searchTerm} onChange={onSearchChange} placeholder="Search patients by name or contact..." />
      </div>
    </div>
  );
};

export default PatientFilters;
