import React from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function ButtonToMainMenu(props){
    const history = useHistory();

    function handlerClick(){
        history.push('/');
    }
    return(
        <Button
        size='lg'
        variant="warning"
        style={{ marginTop: "2em" }}
        onClick={handlerClick}
        >
            Main Menu
        </Button>
    );
}