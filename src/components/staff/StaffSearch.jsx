import SearchBar from '../common/SearchBar';

const StaffSearch = ({ search, onSearchChange, roleFilter, onRoleFilterChange, roles }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <SearchBar value={search} onChange={onSearchChange} placeholder="Search staff by name, role..." />
      <select
        value={roleFilter}
        onChange={(e) => onRoleFilterChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-hospital-500"
      >
        <option value="">All Roles</option>
        {roles.map((r) => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>
    </div>
  );
};

export default StaffSearch;