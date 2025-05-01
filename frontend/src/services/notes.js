import axios from 'axios'
const baseUrl = process.env.NODE_ENV === 'production' ? '/api/notes' : 'http://localhost:3001/api/notes'

const getAllNotes = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const createNote = async newObject => {
  const request = axios.post(baseUrl, newObject)
  const response = await request
  return response.data
}

const updateNote = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  const response = await request
  return response.data
}

const deleteNote = async id => {
  const request = axios.delete(`${baseUrl}/${id}`, id)
  const response = await request
  return response
}

export default { getAllNotes, createNote, updateNote, deleteNote }