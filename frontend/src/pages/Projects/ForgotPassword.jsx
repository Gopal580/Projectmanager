import React, { useState } from 'react';
import { Form, Input, Button, Modal } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  const handleSubmit = async () => {
    try {
        setLoading(true);
      const values = await form.validateFields();
      setEmail(values.email);
      setPassword(values.password);

      const res = await axios.post('http://localhost:5000/api/users/send-otp', { email: values.email, purpose: "reset" });
      console.log(res)
      toast.success('OTP sent to your email');
      setOtpModalVisible(true);
    } catch (error) {
         const msg = error.response?.data?.message || "Something went wrong";
            toast.error(msg);
    }finally{
        setLoading(false)
    }
  };

  
  const handleVerifyOtp = async () => {
    if (!otp) return toast.error('Please enter OTP');

    setLoading(true);
    try {
      // Verify OTP
      const verifyRes = await axios.post('http://localhost:5000/api/users/verify-otp', { email, otp });

      // If OTP correct  then reset password
      if (verifyRes.data.success) {
        await axios.post('http://localhost:5000/api/users/reset-password', {
          email,
          password,
        });

        toast.success('Password reset successful');
        setOtpModalVisible(false);
        navigate('/login');
      } else {
        toast.error('Invalid OTP');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error verifying OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <Form form={form} layout="vertical" className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please enter your email' }, { type: 'email' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="password"
          rules={[{ required: true, message: 'Please enter a new password' }]}
        >
          <Input.Password />
        </Form.Item>

        <Button type="primary" onClick={handleSubmit} className="w-full" loading={loading}>Send OTP</Button>
      </Form>

      {/* ✅ OTP Modal */}
      <Modal
        title="Enter OTP"
        open={otpModalVisible}
        onOk={handleVerifyOtp}
        onCancel={() => setOtpModalVisible(false)}
        confirmLoading={loading}
        okText="Verify OTP"
      >
        <Input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default ForgotPassword;
