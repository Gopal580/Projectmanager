import React, { useEffect, useState ,useRef} from 'react';
import ProjectsTable from '../../Components/common/ProjectTableLayout';
import { usePaginatedProjects } from '../../api/usePaginatedProjects';
import StatusBadge from '../../Components/dashboard/StatusBadge';
import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
const InvoiceRaised = () => {
  const [search,setSearch]=useState('');
  const [debouncedSearch,setDebouncedSearch]=useState('')
  const [selectedRowKeys,setSelectedRowKeys]=useState([]);
  const debounceTimout=useRef();

  const invoiceRaisedColumns = [
  {
    title: 'Project Name',
    dataIndex: 'projectName',
    key: 'projectName',
  },
  {
    title: 'Type',
    dataIndex: 'projectType',
    key: 'projectType', 
  },
  {
    title: 'Client',
    dataIndex: 'client',
    key: 'client', 
  },
  {
    title: 'Date Received',
    dataIndex: 'dateReceived',
    key: 'dateReceived', 
    render: d => new Date(d).toLocaleDateString(),
    searchable: true, //  allow search even with render
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status', //  Add key
    render: (status) => <StatusBadge status={status} />,
    searchable: true, //  allow search
  },
  {
    title: 'Actions',
    key: 'action',
    render: (_, record) => (
      <Link to={`/projects/${record._id}`} className="text-purple-600 underline">View</Link>
    )
  }
];

  useEffect(()=>{
      if(debounceTimout.current) clearTimeout(debounceTimout.current);
      debounceTimout.current=setTimeout(()=>{
        setDebouncedSearch(search);
      },400)
      return  ()=>clearTimeout(debounceTimout.current);
  },[search])
  const {projects}=usePaginatedProjects({page:1,pageSize:10,status:"Invoice Raised",search:debouncedSearch})

  return <ProjectsTable 
  data={projects}
       columnsExtras={invoiceRaisedColumns}   
       searchValue={search}
       setSearchValue={setSearch}   
       showApproveButton='false'
         selectedRowKeys={selectedRowKeys}
  setSelectedRowKeys={setSelectedRowKeys}
   />;
};

export default InvoiceRaised;
