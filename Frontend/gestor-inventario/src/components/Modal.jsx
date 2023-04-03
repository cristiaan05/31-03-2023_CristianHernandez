import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { store } from '../providers/store';
import { getCategoriasAll } from '../providers/categoriasSlice';
import { Departamentos } from "../guatemala";

function ModalForm({ titulo, content }) {
    const [show, setShow] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const initialState = store.getState();
    const [successfull, setSuccessfull] = useState(false)
    //DATOS PARA FORM CATEGORIA
    const [formDataCat, setFormDataCat] = useState({ nombre: '' })
    const { ruta, categorias } = useSelector(state => state.categorias)

    //DATOS PARA FORM PRODUCTOS
    const [formDataP, setFormDataP] = useState({ nombreProducto: '', idCategoria: '', descripcion: '' })
    const { rutaProducto } = useSelector(state => state.productos);
    const dispatch = useDispatch()
    function cargar() {
        dispatch(getCategoriasAll())
    }

    //DATOS PARA FORM SUCURSALES
    const [formDataS, setFormDataS] = useState({ nombreSucursal: '', direccion: '', correo: '', departamento: '', municipio: '', telefono: '' })
    const { rutaSucursal } = useSelector(state => state.sucursales);

    useEffect(() => {
        cargar()
        //setAccountsUser(accounts)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const navigate = useNavigate();
    const handleClose = () => {
        setShow(false);
        switch (content) {
            case 'categoria':
                navigate(ruta);
                return
            case 'producto':
                navigate(rutaProducto);
                return
            case 'sucursal':
                navigate(rutaSucursal);
                return
            default:
                return null;
        }
    };

    const renderForm = () => {
        switch (content) {
            case 'categoria':
                const handleInputChangeCat = (e) => {
                    const { name, value } = e.target;
                    setFormDataCat({ ...formDataCat, [name]: value });
                    //console.log(e.target)
                }
                const handleSubmitCategoria = async (e) => {
                    e.preventDefault()
                    try {
                        console.log(formDataCat.nombre)
                        const response = await fetch('http://localhost:3800/addCategory', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                nombre: formDataCat.nombre,

                            })
                        });

                        let responseJson = await response.json();
                        console.log(responseJson);

                        if (responseJson.successfull) {
                            setSuccessfull(true)
                        } else {
                            console.log("error")

                        }
                    } catch (error) {
                        console.log(error)
                    }

                }
                return <Form onSubmit={handleSubmitCategoria}>
                    <Form.Group className="mb-3" id="nombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text"
                            placeholder="Ingrese Nombre"
                            name='nombre'
                            value={formDataCat.nombre} onChange={handleInputChangeCat} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Crear
                    </Button>
                </Form>;

            case 'producto':
                const handleInputChangeP = (e) => {
                    const { name, value } = e.target;
                    setFormDataP({ ...formDataP, [name]: value });
                    //console.log(e.target)
                }
                const handleSubmitProducto = async (e) => {
                    e.preventDefault()
                    console.log(formDataP)
                    try {
                        const response = await fetch('http://localhost:3800/addProduct', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                nombreProducto: formDataP.nombreProducto,
                                idCategoria: formDataP.idCategoria,
                                descripcion: formDataP.descripcion
                            })
                        });

                        let responseJson = await response.json();
                        console.log(responseJson);

                        if (responseJson.successfull) {
                            setSuccessfull(true)
                        } else {
                            console.log("error")

                        }
                    } catch (error) {
                        console.log(error)
                    }

                }
                return <Form onSubmit={handleSubmitProducto}>
                    <Form.Group className="mb-3" id="nombreProducto">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text"
                            placeholder="Ingrese Nombre"
                            name='nombreProducto'
                            value={formDataP.nombreProducto} onChange={handleInputChangeP} />
                    </Form.Group>
                    <Form.Group className="mb-3" id="idCategoria">
                        <Form.Label>Id Categoria</Form.Label>
                        <Form.Select
                            id="idCategoria"
                            name="idCategoria"
                            value={formDataP.idCategoria}
                            onChange={handleInputChangeP}
                        >
                            {categorias && categorias.map((cat) => (
                                <option key={cat.IdCategoria} value={cat.IdCategoria}>
                                    {cat.IdCategoria}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" id="descripcion">
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control type="text"
                            placeholder="Ingrese Descripcion"
                            name='descripcion'
                            value={formDataP.descripcion} onChange={handleInputChangeP} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Crear
                    </Button>
                </Form>;

            case 'sucursal':
                let departa = Departamentos.find(({ nombre }) => nombre === formDataS.departamento);
                const handleInputChangeS = (e) => {
                    const { name, value } = e.target;
                    setFormDataS({ ...formDataS, [name]: value });
                }
                
                //let muni=municipios[formDataS.departamento]
                const handleSubmitSucursal = async (e) => {
                    e.preventDefault()
                    try {
                        const response = await fetch('http://localhost:3800/addSucursal', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                nombreSucursal: formDataS.nombreSucursal,
                                direccion: formDataS.direccion,
                                correo: formDataS.correo,
                                departamento: formDataS.departamento,
                                municipio: formDataS.municipio,
                                telefono: formDataS.telefono
                            })
                        });

                        let responseJson = await response.json();
                        console.log(responseJson);

                        if (responseJson.successfull) {
                            setSuccessfull(true)
                        } else {
                            console.log("error")

                        }
                    } catch (error) {
                        console.log(error)
                    }

                }
                return <Form onSubmit={handleSubmitSucursal}>
                    <Form.Group className="mb-3" id="nombreSucursal">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text"
                            placeholder="Ingrese Nombre"
                            name='nombreSucursal'
                            value={formDataS.nombreSucursal} onChange={handleInputChangeS} />
                    </Form.Group>
                    <Form.Group className="mb-3" id="direccion">
                        <Form.Label>Direccion</Form.Label>
                        <Form.Control type="text"
                            placeholder="Ingrese Direccion"
                            name='direccion'
                            value={formDataS.direccion} onChange={handleInputChangeS} />
                    </Form.Group>
                    <Form.Group className="mb-3" id="correo">
                        <Form.Label>Correo</Form.Label>
                        <Form.Control type="email"
                            placeholder="Ingrese Correo"
                            name='correo'
                            value={formDataS.correo} onChange={handleInputChangeS} />
                    </Form.Group>
                    <Form.Group className="mb-3" id="departamento">
                        <Form.Label>Departamento</Form.Label>
                        <Form.Select
                            id="departamento"
                            name="departamento"
                            value={formDataS.departamento}
                            onChange={handleInputChangeS}
                        >
                            {Departamentos && Departamentos.map((cat, index) => (
                                <option key={index} value={cat.nombre}>
                                    {cat.nombre}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" id="municipio">
                        <Form.Label>Municipio</Form.Label>
                        <Form.Select
                            id="municipio"
                            name="municipio"
                            value={formDataS.municipio}
                            onChange={handleInputChangeS}
                        >

                            {departa && departa.muni.map((cat, index) => (
                                <option key={index} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" id="telefono">
                        <Form.Label>Telefono</Form.Label>
                        <Form.Control type="text"
                            placeholder="Ingrese Telefono"
                            name='telefono'
                            value={formDataS.telefono} onChange={handleInputChangeS} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Crear
                    </Button>
                </Form>;

            default:
                return null;
        }
    };

    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {renderForm()}
                    {successfull && <p color='green'>Creado Exitosamente</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalForm;