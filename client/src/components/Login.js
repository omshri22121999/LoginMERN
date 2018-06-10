import React from 'react'
import {ProgressBar,PageHeader,Form,Alert,FormGroup,FormControl,ControlLabel,Button} from 'react-bootstrap'
import axios from "axios/index";
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:"",
            password:"",
            exists:""
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.checkUserName = this.checkUserName.bind(this);
    }
    handleChangeName(e) {
        this.setState({ name: e.target.value});
    }
    handleChangePass(e) {
        this.setState({ password: e.target.value});
    }
    checkUserName(){
        axios({
            method: 'POST',
            url: 'http://localhost:3001/login',
            data: {
                username: this.state.name,
                password: this.state.password
            }
            })
                .then(res => {
                    this.setState({
                        exists: res.data.message
                    });
                })
                .catch(err => {
                    this.setState({
                        exists: "Auth Failed"
                    });
                });
        }

    render(){
        return(
            <div>
                <PageHeader>Login</PageHeader>
                <Form>
                    <FormGroup
                    controlId={"usr"}>
                        <ControlLabel > User Name</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.name}
                            onChange={this.handleChangeName}
                            placeholder = "Enter Username"
                        />
                    </FormGroup>
                    <FormGroup
                    controlId={"pwd"}>
                        <ControlLabel >Password</ControlLabel>
                        <FormControl
                            type="password"
                            placeholder = "Enter Password"
                            value={this.state.password}
                            onChange={this.handleChangePass}
                        />
                    </FormGroup>
                    <Button onClick={this.checkUserName}>Login</Button>
                    <h3>{this.state.exists}</h3>
                </Form>
            </div>
        );
    }
}
export default Login