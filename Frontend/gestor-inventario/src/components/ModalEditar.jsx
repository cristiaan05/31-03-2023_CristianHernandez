import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { store } from '../providers/store';
import { getCategoriasAll } from '../providers/categoriasSlice';
import { Departamentos } from "../guatemala";
import { getProductosAll } from '../providers/productosSlice';
import { getSucursalesAll } from '../providers/sucursalSlice';

function ModalEditar({ titulo, content }) {
    const [show, setShow] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const initialState = store.getState();
    const [successfull, setSuccessfull] = useState(false)
    //DATOS PARA FORM CATEGORIA
    const [formDataCat, setFormDataCat] = useState({ idCategoria: '', nombre: '' })
    const { ruta, categorias } = useSelector(state => state.categorias)

    //DATOS PARA FORM PRODUCTOS
    const [formDataP, setFormDataP] = useState({ idProducto: '', nombreProducto: '', idCategoriaP: '', descripcion: '' })
    const { rutaProducto, productos } = useSelector(state => state.productos);

    //datos para form editar inventarios
    const [formDataI, setFormDataI] = useState({ idInventario: '', idProducto: '', idSucursal: '', cantidad: '' })

    const dispatch = useDispatch()
    function cargar() {
        dispatch(getCategoriasAll())
        dispatch(getProductosAll())
        dispatch(getSucursalesAll())
    }

    //DATOS PARA FORM SUCURSALES
    const [formDataS, setFormDataS] = useState({ idSucursal: '', nombreSucursal: '', direccion: '', correo: '', departamento: '', municipio: '', telefono: '' })
    const { rutaSucursal, sucursales } = useSelector(state => state.sucursales);
    const { state } = useLocation();
    useEffect(() => {
        cargar()
        //setAccountsUser(accounts)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        // Aquí podrías hacer una petición para obtener los datos previamente según el id seleccionado

        if (state) {
            const { id } = state;
            console.log(id)
            if (content === 'sucursal') {
                formDataS.idSucursal = id.IdSucursal;
                formDataS.nombreSucursal = id.NombreSucursal;
                formDataS.direccion = id.Direccion
                formDataS.correo = id.Correo;
                formDataS.departamento = id.Departamento;
                formDataS.municipio = id.Municipio;
                formDataS.telefono = id.Telefono;
                //setCurrency(currency);

            } else if (content === 'categoria') {
                formDataCat.idCategoria = id.IdCategoria
                formDataCat.nombre = id.Nombre
            }
            else if (content === 'producto') {
                formDataP.idProducto = id.IdProducto
                formDataP.descripcion = id.Descripcion
                formDataP.nombreProducto = id.NombreProducto
                formDataP.idCategoriaP = id.IdCategoria
            }
            else if (content === 'inventario') {
                formDataI.idInventario = id.IdInventario
                formDataI.idProducto = id.IdProducto
                formDataI.idSucursal = id.IdSucursal
                formDataI.cantidad = id.cantidad
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [content]);

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
            case 'inventario':
                navigate('/');
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
                        const response = await fetch('http://localhost:3800/updateCategory', {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                idCategoria: formDataCat.idCategoria,
                                nombreCategoria: formDataCat.nombre,
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
                        Editar
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
                        const response = await fetch('http://localhost:3800/updateProduct', {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                idProducto: formDataP.idProducto,
                                nombreProducto: formDataP.nombreProducto,
                                idCategoria: formDataP.idCategoriaP,
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
                        <Form.Label>Id</Form.Label>
                        <Form.Control type="text"
                            placeholder="Ingrese Id"
                            name='idProducto'
                            value={formDataP.idProducto} onChange={handleInputChangeP} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3" id="nombreProducto">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text"
                            placeholder="Ingrese Nombre"
                            name='nombreProducto'
                            value={formDataP.nombreProducto} onChange={handleInputChangeP} />
                    </Form.Group>
                    <Form.Group className="mb-3" id="idCategoriaP">
                        <Form.Label>Id Categoria</Form.Label>
                        <Form.Select
                            id="idCategoriaP"
                            name="idCategoriaP"
                            value={formDataP.idCategoriaP}
                            onChange={handleInputChangeP}
                        >
                            {categorias && categorias.map((cat) => (
                                <option key={cat.IdCategoria} value={cat.IdCategoria}>
                                    {cat.Nombre}
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
                        Editar
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
                        const response = await fetch('http://localhost:3800/updateSucursal', {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                idSucursal: formDataS.idSucursal,
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
                    <Form.Group className="mb-3" id="idSucursal">
                        <Form.Label>Id Sucursal</Form.Label>
                        <Form.Control type="number"
                            placeholder="Ingrese Id"
                            name='idSucursal'
                            value={formDataS.idSucursal} onChange={handleInputChangeS} disabled />
                    </Form.Group>
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
                        Editar
                    </Button>
                </Form>;

            case 'inventario':
                const handleInputChangeI = (e) => {
                    const { name, value } = e.target;
                    setFormDataI({ ...formDataI, [name]: value });
                    //console.log(e.target)
                }
                const handleSubmitI = async (e) => {
                    e.preventDefault()
                    try {
                        console.log(formDataI)
                        const response = await fetch('http://localhost:3800/updateInventario', {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                idInventario:formDataI.idInventario,
                                idProducto: formDataI.idProducto,
                                idSucursal: formDataI.idSucursal,
                                cantidad: formDataI.cantidad,

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
                return <Form onSubmit={handleSubmitI}>
                    <Form.Group className="mb-3" id="idProducto">
                        <Form.Label>Producto</Form.Label>
                        <Form.Select
                            id="idProducto"
                            name="idProducto"
                            value={formDataI.idProducto}
                            onChange={handleInputChangeI}
                        >
                            {productos && productos.map((product) => (
                                <option key={product.IdProducto} value={product.IdProducto}>
                                    {product.NombreProducto}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" id="idSucursal">
                        <Form.Label>Sucursal</Form.Label>
                        <Form.Select
                            id="idSucursal"
                            name="idSucursal"
                            value={formDataI.idSucursal}
                            onChange={handleInputChangeI}
                        >
                            {sucursales && sucursales.map((sucur) => (
                                <option key={sucur.IdSucursal} value={sucur.IdSucursal}>
                                    {sucur.NombreSucursal}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" id="cantidad">
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control type="number"
                            placeholder="Ingrese cantidad"
                            name='cantidad'
                            value={formDataI.cantidad} onChange={handleInputChangeI} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Editar Inventario
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
                    {successfull && <p color='green'>Editado Exitosamente</p>}
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

export default ModalEditar;