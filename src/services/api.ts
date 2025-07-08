import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const signup = (email: string) => API.post('/auth/signup', { email });
export const verifyOTP = (email: string, otp: string) => API.post('/auth/verify-otp', { email, otp });
export const getNotes = (token: string) =>
  API.get('/notes', { headers: { Authorization: `Bearer ${token}` } });
export const createNote = (token: string, content: string) =>
  API.post('/notes', { content }, { headers: { Authorization: `Bearer ${token}` } });
export const deleteNote = (token: string, id: string) =>
  API.delete(`/notes/${id}`, { headers: { Authorization: `Bearer ${token}` } });
