import React, {useEffect, useState} from 'react'
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'materialize-css/dist/css/materialize.min.css';
import axios from 'axios';

const ListAppointment = () => {
  const apiUrl = "http://localhost/apiPhp/";
  const [data, setData] = useState([]);
  const [modalInsert, SetModalInsert] = useState(false);
  const [modalUpdate, SetModalUpdate] = useState(false);
  const [modalDelete, SetModalDelete] = useState(false);
  const [AppointmentSelect, SetAppointmentSelect] = useState({
    name: '',
    lastname: '',
    document: '',
    birthdate: '',
    address: '',
    phone: '',
  });

    const createAppointment=e=>{
      const {name, value}=e.target;
      SetAppointmentSelect((prevState)=>({
          ...prevState,
          [name]: value
      }))
      console.log(AppointmentSelect);
    }

    const openCloseModalInsert = ()=>{
      SetModalInsert(!modalInsert);
    }


    const openCloseModalUpdate = ()=>{
        SetModalUpdate(!modalUpdate);
      }

    const openCloseModalDelete = ()=>{
    SetModalDelete(!modalDelete);
    }

    const appointmentGet = async()=>{
      await axios.get(apiUrl)
      .then(response=>{
          setData(response.data);
          console.log(response.data);
      })
      .catch(error=>{
        console.log(error);
      })
    }

    const appointmentPost = async()=>{
        var f = new FormData();
        f.append("name", AppointmentSelect.name);
        f.append("lastname", AppointmentSelect.lastname);
        f.append("document", AppointmentSelect.document);
        f.append("birthdate", AppointmentSelect.birthdate);
        f.append("address", AppointmentSelect.address);
        f.append("phone", AppointmentSelect.phone);
        f.append("METHOD", "POST");
        await axios.post(apiUrl, f)
        .then(response=>{
            setData(data.concat(response.data));
            openCloseModalInsert();
        })
        .catch(error=>{
            console.log(error);
        })
    }

    const appointmentPut = async()=>{
        var f = new FormData();
        f.append("name", AppointmentSelect.name);
        f.append("lastname", AppointmentSelect.lastname);
        f.append("document", AppointmentSelect.document);
        f.append("birthdate", AppointmentSelect.birthdate);
        f.append("address", AppointmentSelect.address);
        f.append("phone", AppointmentSelect.phone);
        f.append("METHOD", "PUT");
        await axios.post(apiUrl, f, {params: {id: AppointmentSelect.id}})
        .then(response=>{
            var dataNew = data;
            dataNew.map(appointment=>{
                if(appointment.id===AppointmentSelect.id){
                    appointment.name=AppointmentSelect.name;
                    appointment.lastname=AppointmentSelect.lastname;
                    appointment.document=AppointmentSelect.document;
                    appointment.birthdate=AppointmentSelect.birthdate;
                    appointment.address=AppointmentSelect.address;
                    appointment.phone=AppointmentSelect.phone;
                }
            });
            setData(dataNew);
            openCloseModalUpdate();
        }).catch(error=>{
            console.log(error);
          })
    }

    const appointmentDelete=async()=>{
        var f = new FormData();
        f.append("METHOD", "DELETE");
        await axios.post(apiUrl, f, {params: {id: AppointmentSelect.id}})
        .then(response=>{
          setData(data.filter(appointment=>appointment.id!==AppointmentSelect.id));
          openCloseModalDelete();
        })
        .catch(error=>{
          console.log(error);
        })
      }

    const selectAppointment=(appointment, caseAppointment)=>{
        SetAppointmentSelect(appointment);

        (caseAppointment==="update")?
        openCloseModalUpdate():
        openCloseModalDelete()
    }

    useEffect(()=>{
        appointmentGet();
    },[])

    return(

    <div className="container">
        <a class="modal-close waves-effect waves-green btn-flat" onClick={()=>openCloseModalInsert()}>Agendar Cita</a>
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Documento</th>
                <th>Fecha de nacimiento</th>
                <th>Dirección</th>
                <th>Telefono movil</th>
                <th>Acciones</th>
            </tr>
            </thead>

            <tbody>
                {data.map(appointment=>(
                    <tr key={appointment.id}>
                        <td>{appointment.id}</td>
                        <td>{appointment.name}</td>
                        <td>{appointment.lastname}</td>
                        <td>{appointment.document}</td>
                        <td>{appointment.birthdate}</td>
                        <td>{appointment.address}</td>
                        <td>{appointment.phone}</td>
                        <td>
                            <button class="btn waves-effect waves-light" type="submit" name="action" onClick={()=>selectAppointment(appointment, "update")}>Editar</button> {"  "}
                            <button class="btn waves-effect waves-light" type="submit" name="action" onClick={()=>selectAppointment(appointment, "delete")}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        {/* modal para crear registro */}
        <Modal isOpen={modalInsert}>
            <ModalHeader>Agendar Cita</ModalHeader>
            <ModalBody>
                <div className="form-group">
                <label>Nombre</label>
                <input type="text" className="form-control" name="name" onChange={createAppointment}/>
                <label>Apellido</label>
                <input type="text" className="form-control" name="lastname" onChange={createAppointment}/>
                <label>Documento</label>
                <input type="text" className="form-control" name="document" onChange={createAppointment}/>
                <label>Fecha de nacimiento</label>
                <input type="text" className="form-control" name="birthdate" onChange={createAppointment}/>
                <label>Direccion</label>
                <input type="text" className="form-control" name="address" onChange={createAppointment}/>
                <label>Telefono movil</label>
                <input type="text" className="form-control" name="phone" onChange={createAppointment}/>
                </div>
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-primary" onClick={()=>appointmentPost()}>Guardar</button>{"   "}
                <button className="btn btn-danger" onClick={()=>openCloseModalInsert()}>Cancelar</button>
            </ModalFooter>
        </Modal>

        {/* modal para editar registro */}
        <Modal isOpen={modalUpdate}>
            <ModalHeader>Agendar Cita</ModalHeader>
            <ModalBody>
                <div className="form-group">
                <label>Nombre</label>
                <input type="text" className="form-control" name="name" onChange={createAppointment} value={AppointmentSelect && AppointmentSelect.name}/>
                <label>Apellido</label>
                <input type="text" className="form-control" name="lastname" onChange={createAppointment} value={AppointmentSelect && AppointmentSelect.lastname}/>
                <label>Documento</label>
                <input type="text" className="form-control" name="document" onChange={createAppointment} value={AppointmentSelect && AppointmentSelect.document}/>
                <label>Fecha de nacimiento</label>
                <input type="text" className="form-control" name="birthdate" onChange={createAppointment} value={AppointmentSelect && AppointmentSelect.birthdate}/>
                <label>Direccion</label>
                <input type="text" className="form-control" name="address" onChange={createAppointment} value={AppointmentSelect && AppointmentSelect.address}/>
                <label>Telefono movil</label>
                <input type="text" className="form-control" name="phone" onChange={createAppointment} value={AppointmentSelect && AppointmentSelect.phone}/>
                </div>
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-primary" onClick={()=>appointmentPut()}>Guardar</button>{"   "}
                <button className="btn btn-danger" onClick={()=>openCloseModalUpdate()}>Cancelar</button>
            </ModalFooter>
        </Modal>

        {/* modal para confirmar eliminación */}
        <Modal isOpen={modalDelete}>
            <ModalBody>
            Estás seguro que deseas eliminar la cita de {AppointmentSelect && AppointmentSelect.name} {AppointmentSelect && AppointmentSelect.lastname}?
            </ModalBody>
            <ModalFooter>
            <button className="btn btn-danger" onClick={()=>appointmentDelete()}>Sí</button>
            <button className="btn btn-secondary" onClick={()=>openCloseModalDelete()}>No</button>
            </ModalFooter>
        </Modal>
    </div>
    )

}

export default ListAppointment;