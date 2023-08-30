import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";

export default class NotFound extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Jumbotron style={{
                width:'80%',
                marginLeft:'10%',
                height:'400px',
                marginTop:'10%'}}>
                <h1>Error 404: Page Not Found</h1>
                <p style={{fontSize:'1.3em'}}>
                    It seems like the page you want to visit dont exist</p>
            </Jumbotron>
        );
    }

}