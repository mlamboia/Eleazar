import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 3000
})

export const addContact = payload => api.post(`/contact`, payload)
export const getAllContacts = () => api.get(`/contacts`)
export const updateContact = (id, payload) => api.put(`/contact/${id}`, payload)
export const deleteContact = id => api.delete(`/contact/${id}`)
export const getContact = id => api.get(`/contact/${id}`)

const apis = {
  addContact,
  getAllContacts,
  updateContact,
  deleteContact,
  getContact
}

export default apis;