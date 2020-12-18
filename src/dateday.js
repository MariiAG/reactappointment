import React, {useEffect, useState} from 'react'
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'materialize-css/dist/css/materialize.min.css';
import axios from 'axios';

const Listdateday = () => {
  const apiUrl = "http://localhost/apiPhp/dateday/dateday.php";
  const [data, setData] = useState([]);
  const [modalInsert, SetModalInsert] = useState(false);
  const [modalUpdate, SetModalUpdate] = useState(false);
  const [modalDelete, SetModalDelete] = useState(false);
  const [DateDaySelect, SetDateDaySelect] = useState({
    day: '',
    place: '',
  });

    const createDateDay=e=>{
      const {name, value}=e.target;
      SetDateDaySelect((prevState)=>({
          ...prevState,
          [name]: value
      }))
      console.log(DateDaySelect);
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

    const dateDayGet = async()=>{
      await axios.get(apiUrl)
      .then(response=>{
          setData(response.data);
          console.log(response.data);
      })
      .catch(error=>{
        console.log(error);
      })
    }

    const dateDayPost = async()=>{
        var f = new FormData();
        f.append("day", DateDaySelect.day);
        f.append("place", DateDaySelect.place);
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

    const dateDayPut = async()=>{
        var f = new FormData();
        f.append("day", DateDaySelect.day);
        f.append("place", DateDaySelect.place);
        f.append("METHOD", "PUT");
        await axios.post(apiUrl, f, {params: {id: DateDaySelect.id}})
        .then(response=>{
            var dataNew = data;
            dataNew.map(dateday=>{
                if(dateday.id===DateDaySelect.id){
                    dateday.name=DateDaySelect.name;
                    dateday.lastname=DateDaySelect.lastname;
                }
            });
            setData(dataNew);
            openCloseModalUpdate();
        }).catch(error=>{
            console.log(error);
          })
    }

    const dateDayDelete=async()=>{
        var f = new FormData();
        f.append("METHOD", "DELETE");
        await axios.post(apiUrl, f, {params: {id: DateDaySelect.id}})
        .then(response=>{
          setData(data.filter(dateday=>dateday.id!==DateDaySelect.id));
          openCloseModalDelete();
        })
        .catch(error=>{
          console.log(error);
        })
      }

    const selectDateDay=(dateday, caseDateDay)=>{
        SetDateDaySelect(dateday);

        (caseDateDay==="update")?
        openCloseModalUpdate():
        openCloseModalDelete()
    }

    useEffect(()=>{
        dateDayGet();
    },[])

    return(
    <div className="container">
        <br/><br/><br/>
        <a class="modal-close waves-effect waves-green btn-flat" onClick={()=>openCloseModalInsert()}>Agendar fecha de Cita</a>
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Fecha Cita</th>
                <th>Consultorio</th>
                <th>Opciones</th>
            </tr>
            </thead>

            <tbody>
                {data.map(dateday=>(
                    <tr key={dateday.id}>
                        <td>{dateday.id}</td>
                        <td>{dateday.day}</td>
                        <td>{dateday.place}</td>
                        <td>
                            <button class="btn waves-effect waves-light" type="submit" name="action" onClick={()=>selectDateDay(dateday, "update")}>Editar</button> {"  "}
                            <button class="btn waves-effect waves-light" type="submit" name="action" onClick={()=>selectDateDay(dateday, "delete")}>Eliminar</button>
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
                <label>Fecha cita</label>
                <input type="text" className="form-control" name="day" onChange={createDateDay}/>
                <label>Consultorio</label>
                <input type="text" className="form-control" name="place" onChange={createDateDay}/>
                </div>
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-primary" onClick={()=>dateDayPost()}>Guardar</button>{"   "}
                <button className="btn btn-danger" onClick={()=>openCloseModalInsert()}>Cancelar</button>
            </ModalFooter>
        </Modal>

        {/* modal para editar registro */}
        <Modal isOpen={modalUpdate}>
            <ModalHeader>Agendar Cita</ModalHeader>
            <ModalBody>
                <div className="form-group">
                <label>Nombre</label>
                <input type="text" className="form-control" name="day" onChange={createDateDay} value={DateDaySelect && DateDaySelect.day}/>
                <label>Apellido</label>
                <input type="text" className="form-control" name="place" onChange={createDateDay} value={DateDaySelect && DateDaySelect.place}/>
                </div>
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-primary" onClick={()=>dateDayPut()}>Guardar</button>{"   "}
                <button className="btn btn-danger" onClick={()=>openCloseModalUpdate()}>Cancelar</button>
            </ModalFooter>
        </Modal>

        {/* modal para confirmar eliminación */}
        <Modal isOpen={modalDelete}>
            <ModalBody>
            Estás seguro que deseas eliminar la cita de {DateDaySelect && DateDaySelect.name} {DateDaySelect && DateDaySelect.lastname}?
            </ModalBody>
            <ModalFooter>
            <button className="btn btn-danger" onClick={()=>dateDayDelete()}>Sí</button>
            <button className="btn btn-secondary" onClick={()=>openCloseModalDelete()}>No</button>
            </ModalFooter>
        </Modal>
    </div>
    )

}

export default Listdateday;