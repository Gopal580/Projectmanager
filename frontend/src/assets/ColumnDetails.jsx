import StatusBadge from "../Components/dashboard/StatusBadge";
import { Link } from "react-router-dom";
const columnsExtras = [
  {
    title: "Project Name",
    dataIndex: "projectName",
    key: "projectName",
  },
  {
    title: "Project Type",
    dataIndex: "projectType",
    key: "projectType",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Date Received",
    dataIndex: "dateReceived",
    key: "dateReceived",
    render: (d) => (d ? new Date(d).toLocaleDateString() : ""),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => <StatusBadge status={status} />,
  },
   {
    title: 'Actions',
    key: 'action',
    render: (_, record) => (
      <Link to={`/projects/${record._id}`} className="text-purple-600 underline">View</Link>
    )
  }
];

export default columnsExtras;
