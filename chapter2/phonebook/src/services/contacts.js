import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

/*Getting all contacts*/
const getAll =()=> {
    const request = axios.get(baseUrl)
    return request.then(
        response => response.data
    )
}
/*Adding new contact*/
const addNew=newContact=>{
    const request = axios.post(baseUrl, newContact)
    return request.then(
        response=> response.data
    )
}
/*Deleting contact*/
const delCont = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response=>response.data)
}
/*Changing number of existing contact*/
const changeCont = (id, contact) =>{
    return axios.put(`${baseUrl}/${id}`, contact)
}
export default {
    getAll,
    addNew,
    delCont,
    changeCont
}