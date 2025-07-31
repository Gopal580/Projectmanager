import React, { useEffect, useRef, useState } from 'react';
import ProjectsTable from '../../Components/common/ProjectTableLayout';
import { usePaginatedProjects } from '../../api/usePaginatedProjects';
import columnsExtras from '../../assets/ColumnDetails';
import useAxios from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

const ApprovedByClient = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const debounceTimout = useRef();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const axiosInstance = useAxios();

  const { projects } = usePaginatedProjects({
    page: 1,
    pageSize: 10,
    status: "Approved by Client",
    search: debouncedSearch,
    refreshTrigger,
  });

  useEffect(() => {
    if (debounceTimout.current) clearTimeout(debounceTimout.current);
    debounceTimout.current = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(debounceTimout.current);
  }, [search]);

  const handleApprove = async () => {
    try {
      await axiosInstance.put('/projects/bulk-update-status', {
        projectIds: selectedRowKeys,
        newStatus: 'Invoice Raised',
      }, { withCredentials: true });
      setSelectedRowKeys([]);
      setRefreshTrigger(prev => prev + 1);
      toast.success("Approved");
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Approval failed");
    }
  };

  return (
    <div className="overflow-x-auto">
      <ProjectsTable
        data={projects}
        searchValue={search}
        setSearchValue={setSearch}
        columnsExtras={columnsExtras}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        onApprove={handleApprove}
      />
    </div>
  );
};

export default ApprovedByClient;
