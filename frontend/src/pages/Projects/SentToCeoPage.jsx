// SentToCeo.jsx
import React, { useRef, useState, useEffect } from 'react';
import ProjectsTable from '../../Components/common/ProjectTableLayout';
import { usePaginatedProjects } from '../../api/usePaginatedProjects';
import columnsExtras from '../../assets/ColumnDetails';
// import axios from 'axios';
import useAxios from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
const SentToCeo = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const axiosInstance=useAxios() // 👈 new trigger
  const debounceTimeout = useRef();

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(debounceTimeout.current);
  }, [search]);

  const { projects } = usePaginatedProjects({
    page: 1,
    pageSize: 10,
    status: "Sent to CEO",
    refreshTrigger,
    search:debouncedSearch // 👈 include in dependency
  });

  const handleApprove = async () => {
    try {
      await axiosInstance.put('/projects/bulk-update-status', {
        projectIds: selectedRowKeys,
        newStatus: 'Approved by Client',
      },{withCredentials:true});
      setSelectedRowKeys([]);
      setRefreshTrigger((prev) => prev + 1);
      toast.success("approved") // 👈 trigger re-fetch
    } catch (err) {
      console.error('Approval failed:', err);
       toast.error("approval failed")
    }
  };

  return (
    <ProjectsTable
      selectedRowKeys={selectedRowKeys}
      setSelectedRowKeys={setSelectedRowKeys}
      onApprove={handleApprove}
      data={projects}
      columnsExtras={columnsExtras}
      searchValue={search}
      setSearchValue={setSearch}
    />
  );
};

export default SentToCeo;
