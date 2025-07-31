import React, { useState } from 'react';
import { Form, Input, Button, Modal, message } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../utils/backendurl';

const SignupForm = () => {
  const [form] = Form.useForm();
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post(`${BACKEND_URL}/users/send-otp`, {
        email: values.email,
        userName: values.username,
        purpose: 'signup',
      });

      if (response.data.success) {
        message.success('OTP sent to email');
        toast.success('OTP sent to email', {
          autoClose: 2000,
          position: 'top-center',
        });

        setEmail(values.email);
        setUserData(values);
        setOtpModalVisible(true);
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Something went wrong';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/users/verify-otp`, {
        email,
        otp,
      });

      if (response.data.success) {
        await axios.post(`${BACKEND_URL}/users/signup`, userData);
        message.success('Signup successful');
        setOtpModalVisible(false);
        form.resetFields();
        toast.success('Signup successful');
        navigate('/login');
      }
    } catch (error) {
      message.error(error.response?.data?.message || 'OTP verification failed');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>
        <Form form={form} layout="vertical" onFinish={handleSignup}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please enter a username' }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Enter a valid email address' },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password size="large" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            className="bg-blue-600 hover:bg-blue-700 mt-2"
            size="large"
          >
            Send OTP
          </Button>
        </Form>

        <div className="text-center mt-4 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </div>

      {/* OTP Modal */}
      <Modal
        open={otpModalVisible}
        title="Enter OTP"
        onCancel={() => setOtpModalVisible(false)}
        onOk={handleVerifyOtp}
        okText="Verify"
      >
        <Input
          placeholder="Enter the OTP sent to your email"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default SignupForm;
