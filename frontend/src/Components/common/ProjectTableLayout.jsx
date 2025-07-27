// components/ProjectsTable.jsx
import React from 'react';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined, DownloadOutlined, CheckOutlined } from '@ant-design/icons';
import { useState,useRef } from 'react';
import Highlighter from 'react-highlight-words';
import { toast } from 'react-toastify';

const ProjectsTable = ({
  data = [],
  loading = false,
  pagination,
  onTableChange,
  columnsExtras = [],
  searchValue = '',
  //setSearchValue,
   selectedRowKeys = [],
  setSelectedRowKeys = () => {},
  onApprove = () => {},
   setSearchValue = () => {},
     showApproveButton = 'true',
}) => {
   const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    setSearchText("");
    confirm();
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters, confirm)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    filterDropdownProps: {
      onOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : "",
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = columnsExtras.map((col) => {
    if (!col.key || col.key === "action") return col;

    const isDate = col.dataIndex === "dateReceived";

    const base = {
      ...col,
      sorter: isDate
        ? (a, b) => new Date(a[col.dataIndex]) - new Date(b[col.dataIndex])
        : (a, b) =>
            a[col.dataIndex]?.toString().localeCompare(b[col.dataIndex]?.toString()),
    };

    // Only apply search if there's no custom render (like StatusBadge)
    return col.render ? base : { ...base, ...getColumnSearchProps(col.dataIndex) };
  });
  const filteredData = data.filter((item) =>
    item.projectName.toLowerCase().includes(searchValue.toLowerCase())
  );
const rowSelection = {
  selectedRowKeys,
  onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
};
 
  const exportSelectedRows = () => {
    if (selectedRowKeys.length === 0) return;

    const selectedData = data.filter((item) => selectedRowKeys.includes(item._id));

    const csvHeader = Object.keys(selectedData[0])
      .filter((key) => key !== "__v")
      .join(",");

    const csvRows = selectedData.map((row) =>
      Object.values(row)
        .map((val) => `"${String(val).replace(/"/g, '""')}"`)
        .join(",")
    );
  
const csvContent = [csvHeader, ...csvRows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "selected-projects.csv");
    document.body.appendChild(link);
       toast.success("Your file is downloading...");
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="px-6 pb-6">
      {/* Search + Actions */}
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="🔍 Search projects..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-64"
          prefix={<SearchOutlined />}
        />

        <Space>
          <Button icon={<DownloadOutlined />}  onClick={exportSelectedRows} disabled={selectedRowKeys.length === 0}>Export</Button>
          {showApproveButton=='true' && (<Button icon={<CheckOutlined />} className="bg-purple-100 text-purple-700"  
          disabled={selectedRowKeys.length === 0}
          onClick={onApprove}>
            Mark as Approved
          </Button>)}
        </Space>
      </div>

      {/* Ant Design Table */}
      <Table 
      columns={columns}
       rowSelection={rowSelection}
        // columns={columnsExtras}
        dataSource={filteredData}
        rowKey={(record) => record._id}
        loading={loading}
        pagination={{
          current: pagination?.current || 1,
          pageSize: pagination?.pageSize || 10,
          total: pagination?.total || 0,
        }}
        onChange={(pagination) => {
          if (onTableChange) onTableChange(pagination);
        }}
        bordered
      />
    </div>
  );
};

export default ProjectsTable;
