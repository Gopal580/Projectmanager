import React, { useState } from 'react';
import { Form, Input, Button, message, Card } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../utils/backendurl';
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
   const { login,setAccessToken } = useAuth();
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/users/login`, values,{ withCredentials: true});
      message.success(res.data.message);
      toast.success("Login Successfull");
      
       if(res.data.success){
          login(res.data.user);
          setAccessToken(res.data.token)
         
        navigate('/dashboard')
       }
      // Redirect or save user/token if needed
    } catch (err) {
      message.error(err.response?.data?.error || 'Login failed');
      toast.error("Login failed")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card title="Login" className="w-full max-w-md shadow-md rounded-2xl">
        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Enter a valid email!' }
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' }
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>
            <div className="text-right mb-2">
  <Link to="/forgot-password" className="text-blue-600 text-sm">Forgot password?</Link>
</div>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700"
              size="large"
              loading={loading}
            >
              Login
            </Button>
          </Form.Item>

          <Form.Item className="text-center">
            Don't have an account? <Link to="/register" className="text-blue-600">Sign up</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
