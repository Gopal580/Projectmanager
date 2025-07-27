  import StatusBadge from "../Components/dashboard/StatusBadge";
 const columnsExtras = [
    { title: "Project Name", dataIndex: "projectName", key: "projectName" },
    { title: "Project Type", dataIndex: "projectType", key: "projectType" },
    { title: "Category", dataIndex: "category", key: "category" },
    // { title: "Contact Person", dataIndex: "contactPerson", key: "contactPerson" },
    // { title: "End Client", dataIndex: "endClient", key: "endClient" },
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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <a
          className="text-purple-600 underline hover:text-purple-800"
          href={`/projects/${record._id}`}
        >
          View
        </a>
      ),
    },
  ];
  export default columnsExtras;