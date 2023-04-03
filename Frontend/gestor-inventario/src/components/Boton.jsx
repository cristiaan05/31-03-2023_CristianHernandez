import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

function Boton({ contenido, color,accion }) {

    return (
            <Button variant={color} className="float-end " onClick={accion}>
                {contenido}
            </Button>

    )


}

Boton.propTypes = {
    contenido: PropTypes.string.isRequired,
};

export default Boton;
