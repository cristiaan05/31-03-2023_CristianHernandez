import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";


function ConfirmDeleteModal({ tipo }) {
    const [showModal, setShowModal] = useState(true);
    const [idEliminar, setIdEliminar] = useState('');
    const navigate = useNavigate();
    const { state } = useLocation();
    const handleClose = () => {
        setShowModal(false);
        switch (tipo) {
            case 'sucursal':
                navigate('/sucursales')

                break;
            case 'categoria':
                navigate('/categorias');
                break;
            case 'producto':
                navigate('/productos');
                break;
            case 'inventario':
                navigate('/');
                break;
            default:
                break;
        }
    }
    useEffect(() => {
        setIdEliminar(state.id);
    }, [state]);
    // (state) {
    //const { id } = state;
    //setIdEliminar(id)
    //setCurrency(currency);
    //}
    const handleConfirm = async () => {
        // Aquí puedes agregar la lógica para eliminar el elemento
        switch (tipo) {
            case 'sucursal':
                console.log(idEliminar)
                try {
                    const response = await fetch('http://localhost:3800/deleteSucursal', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            idSucursal: parseInt(idEliminar),
                        })
                    });

                    let responseJson = await response.json();
                    console.log(responseJson);

                    if (responseJson.successfull) {
                        alert('Eliminado exitosamente!')
                    } else {
                        console.log("error")

                    }
                } catch (error) {
                    console.log(error)
                }
                break;
            case 'categoria':
                console.log(idEliminar)
                try {
                    const response = await fetch('http://localhost:3800/deleteCategory', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            idCategoria: parseInt(idEliminar),
                        })
                    });

                    let responseJson = await response.json();
                    console.log(responseJson);

                    if (responseJson.successfull) {
                        alert('Eliminado exitosamente!')
                    } else {
                        console.log("error")

                    }
                } catch (error) {
                    console.log(error)
                }
                break;
            case 'producto':
                try {
                    const response = await fetch('http://localhost:3800/deleteProduct', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            idProducto: parseInt(idEliminar),
                        })
                    });

                    let responseJson = await response.json();
                    console.log(responseJson);

                    if (responseJson.successfull) {
                        alert('Eliminado exitosamente!')
                    } else {
                        console.log("error")

                    }
                } catch (error) {
                    console.log(error)
                }
                break;
            case 'inventario':
                try {
                    const response = await fetch('http://localhost:3800/deleteInventario', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            idInventario: parseInt(idEliminar),
                        })
                    });

                    let responseJson = await response.json();
                    console.log(responseJson);

                    if (responseJson.successfull) {
                        alert('Eliminado exitosamente!')
                    } else {
                        console.log("error")

                    }
                } catch (error) {
                    console.log(error)
                }
                break;
            default:
                break;
        }
        handleClose();

    };

    return (
        <>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Está seguro de que desea eliminar este elemento?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleConfirm}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ConfirmDeleteModal;
