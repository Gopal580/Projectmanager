import React, { useEffect, useState,useRef } from "react";
import { Typography, Row, Col } from "antd";
import {
  PlusSquareOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  FileDoneOutlined,
  ProjectOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
// import axios from "axios";

import StatsCard from '../../Components/dashboard/StatsCard'
import StatusBadge from '../../Components/dashboard/StatusBadge'
import ProjectsTable from "../../Components/common/ProjectTableLayout";
import useAxios from "../../utils/axiosInstance";

const { Title } = Typography;

const DashboardPage = () => {
  const [stats, setStats] = useState({});
  const [projects, setProjects] = useState([]);
  const [allProjects,setAllProjects]=useState([]);
  const [todayProjects, setTodayProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [search, setSearch] = useState("");
   const [debouncedSearch, setDebouncedSearch] = useState("");
   const [selectedRowKeys, setSelectedRowKeys] = useState([]);
   const axiosInstance=useAxios();
    const debounceTimout =useRef();

  const fetchDashboardStats = async () => {
    try {
      const res = await axiosInstance.get("/projects/dashboard-stats");
      setStats(res.data.stats || {});
      setAllProjects(res.data.allProjects || {});
    } catch (err) {
      console.error("Stats Error:", err);
    }
  };
  useEffect(() => {
     fetchDashboardStats();
 }, []);


   
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/projects/getAllProjects",{
         params: {
          page: pagination.current,
          pageSize: pagination.pageSize,
          search:debouncedSearch
        },withCredentials:true});
      
      setProjects(res.data.projects);
        setPagination((prev) => ({ ...prev, total: res.data.total || 0 }));
      setTodayProjects(
        res.data.projects.filter(p => new Date(p.dateReceived).toDateString() === new Date().toDateString())
      );
    } catch (err) {
      console.error("Projects Error:", err);
    } finally {
      setLoading(false);
    }
    
  };
  useEffect(() => {
    fetchProjects();
  }, [pagination.current,pagination.pageSize]);
  const summaryTypes = ["Mockups", "Proposals", "Presentations", "Credentials", "RFP", "AI Work", "Creative Work"];
  const summary = summaryTypes.map((type) => ({
    type,
    count: allProjects.filter((p) => p.projectType === type).length,
  }));

  const dashboardTableColumns = [
  {
    title: 'Project Name',
    dataIndex: 'projectName',
    key: 'projectName', //  required for search/sort to apply
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
    render: (d) => new Date(d).toLocaleDateString(),
    searchable: true, // allow search even with custom render
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => <StatusBadge status={status} />,
    searchable: true, //  allow search even with custom render
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
      setPagination((prev) => ({ ...prev, current: 1 }));
      },400);
    return () => clearTimeout(debounceTimout.current);
  }, [search]);
  return (
    <div className="p-6">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <StatsCard title="New Projects" value={stats.newProject || 0} icon={<PlusSquareOutlined />} linkTo="/projects/new" />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <StatsCard title="Sent to CEO" value={stats.sentToCEO || 0} icon={<SyncOutlined />} linkTo="/projects/sent-to-ceo" />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <StatsCard title="Approved by Client" value={stats.approvedByClient || 0} icon={<CheckCircleOutlined />} linkTo="/projects/approved-by-client" />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <StatsCard title="Invoice Raised" value={stats.invoiceRaised || 0} icon={<FileDoneOutlined />} linkTo="/projects/invoice-raised" />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <StatsCard title="Total Projects" value={stats.totalProjects || 0} icon={<ProjectOutlined />} linkTo="/dashboard" />
        </Col>
      </Row>

      <div className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <Title level={4}>Recent Projects</Title>
          <Link to="/projects/create" className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-md">
            <PlusOutlined /> New Project
          </Link>
        </div>
     {/* niche */}
        <ProjectsTable
          data={projects}
          columnsExtras={dashboardTableColumns}
          loading={loading}
          pagination={pagination}
          onTableChange={(pagination) => setPagination(pagination)}
          searchValue={search}
          setSearchValue={setSearch}
          showApproveButton='false'
            selectedRowKeys={selectedRowKeys}
  setSelectedRowKeys={setSelectedRowKeys}
        />
      </div>
  {/* upr */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-10">
        <div className="bg-white p-5 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Today's Activity</h2>
          {todayProjects.length > 0 ? todayProjects.map((p) => (
            <div key={p._id} className="flex gap-4 items-start mb-3 bg-gray-50 p-3 rounded-md">
              <div className="text-lg">
                {p.status === "Invoice Raised" ? <FileDoneOutlined className="text-amber-600" /> :
                  p.status === "Sent to CEO" ? <SyncOutlined className="text-blue-600" /> :
                    <CheckCircleOutlined className="text-green-600" />}
              </div>
              <div>
                <Link to={`/projects/${p._id}`} className="font-medium text-gray-900">{p.projectName}</Link>
                <p className="text-sm text-gray-500">Status updated to <strong>{p.status}</strong></p>
                <p className="text-xs text-gray-400">{new Date(p.updatedAt).toLocaleTimeString()}</p>
              </div>
            </div>
          )) : <p className="text-gray-500">No recent updates today.</p>}
        </div>

        <div className="bg-white p-5 rounded-lg shadow">
          <Title level={5}>Project Summary</Title>
          <div className="mt-4 space-y-2">
            {summary.map(({ type, count }) => (
              <div key={type} className="flex justify-between text-sm">
                <span>{type}</span>
                <span className="font-semibold">{count}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold border-t pt-2 mt-2">
              <span>Total</span>
              <span>{allProjects.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
