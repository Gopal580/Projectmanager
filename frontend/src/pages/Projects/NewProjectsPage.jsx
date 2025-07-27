// NewProjects.jsx
import React, { useRef, useState, useEffect } from 'react';
import ProjectsTable from '../../Components/common/ProjectTableLayout';
import { usePaginatedProjects } from '../../api/usePaginatedProjects';
import columnsExtras from '../../assets/ColumnDetails';
// import axios from 'axios';
import useAxios from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

const NewProjects = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const axiosInstance=useAxios();
  const debounceTimout = useRef();

  const { projects } = usePaginatedProjects({
    page: 1,
    pageSize: 10,
    status: "New",
    refreshTrigger, 
    search:debouncedSearch
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
        newStatus: 'Sent to CEO',
      },{withCredentials:true});
      setSelectedRowKeys([]);
      setRefreshTrigger((prev) => prev + 1);
      toast.info("approved")
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
      searchValue={search}
      setSearchValue={setSearch}
      columnsExtras={columnsExtras}
    />
  );
};

export default NewProjects;
