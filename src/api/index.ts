import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Customer APIs
export const getCustomers = () => api.get('/customers').then(res => res.data);
export const createCustomer = (data: any) => api.post('/customers', data).then(res => res.data);
export const updateCustomer = (id: string, data: any) => api.patch(`/customers/${id}`, data).then(res => res.data);
export const deleteCustomer = (id: string) => api.delete(`/customers/${id}`).then(res => res.data);

// Campaign APIs
export const getCampaigns = () => api.get('/campaigns').then(res => res.data);
export const createCampaign = (data: any) => api.post('/campaigns', data).then(res => res.data);
export const sendCampaign = (id: string) => api.post(`/campaigns/${id}/send`).then(res => res.data);

// Order APIs
export const getOrders = () => api.get('/orders').then(res => res.data);
export const createOrder = (data: any) => api.post('/orders', data).then(res => res.data);
export const updateOrderStatus = (id: string, status: string) => 
  api.patch(`/orders/${id}/status`, { status }).then(res => res.data);