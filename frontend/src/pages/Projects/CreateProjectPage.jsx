import React, { useState } from "react";
import { Form, Input, Button, Select, DatePicker, message, Card } from "antd";
import useAxios from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { Option } = Select;

const CreateProjectPage = () => {
  const [loading, setLoading] = useState(false);
  const axiosInstance=useAxios();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const payload = {
        ...values,
        dateReceived: values.dateReceived.format("YYYY-MM-DD"),
      };
       await axiosInstance.post("/projects/create", payload,{withCredentials:true});
      message.success("Project created successfully");
      toast.success("Project Created successfulyy")
      
     navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "something is wrong ");
      message.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card title="Create New Project" className="w-full max-w-2xl shadow-lg rounded-2xl">
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ status: "New" }}
        >
          <Form.Item
            name="projectName"
            label="Project Name"
            rules={[{ required: true, message: "Please enter project name" }]}
          >
            <Input size="large" placeholder="e.g. studynotion" />
          </Form.Item>

          <Form.Item
            name="projectType"
            label="Project Type"
            rules={[{ required: true, message: "Please select project type" }]}
          >
            <Select size="large" placeholder="Select type">
              <Option value="Mockups">Mockups</Option>
              <Option value="Proposals">Proposals</Option>
              <Option value="Presentations">Presentations</Option>
              <Option value="Credentials">Credentials</Option>
              <Option value="RFP">RFP</Option>
              <Option value="AI Work">AI Work</Option>
              <Option value="Creative Work">Creative Work</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please enter category" }]}
          >
            <Input size="large" placeholder="e.g. Simple, Complex" />
          </Form.Item>

          <Form.Item
            name="client"
            label="Client Name"
            rules={[{ required: true, message: "Please enter client name" }]}
          >
            <Input size="large" placeholder="e.g. rohit" />
          </Form.Item>

          <Form.Item
            name="dateReceived"
            label="Date Received"
            rules={[{ required: true, message: "Please select date" }]}
          >
            <DatePicker size="large" className="w-full" format="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true }]}
          >
            <Select size="large">
              <Option value="New">New</Option>
              <Option value="Sent to CEO">Sent to CEO</Option>
              <Option value="Approved by Client">Approved by Client</Option>
              <Option value="Invoice Raised">Invoice Raised</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="bg-blue-600 hover:bg-blue-700 w-full"
              loading={loading}
            >
              Create Project
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreateProjectPage;
