import React from 'react'
import axios from 'axios'
import {Alert,ProgressBar,PageHeader,Form,FormGroup,FormControl,ControlLabel,Button} from 'react-bootstrap'
class SignUp extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                name:"",
                password:"",
                saved:""
            };
            this.handleChangeName = this.handleChangeName.bind(this);
            this.handleChangePass = this.handleChangePass.bind(this);
            this.validatePassword = this.validatePassword.bind(this);
            this.validateUserName = this.validateUserName.bind(this);
            this.sendUserName = this.sendUserName.bind(this);
        }
        handleChangeName(e) {
            this.setState({ name: e.target.value});
        }
        handleChangePass(e) {
            this.setState({ password: e.target.value});
        }
        validateUserName(){
            const length = this.state.name.length;
            if (length > 5 && !(/\W/g.test(this.state.name))) return {type:'success',visible:'none'};
            else if (length > 0) return {type:'error',visible:''};
            return {type:null,visible:'none'};
        }
        sendUserName(){
            if(this.validateUserName().type==='success'&&(this.validatePassword().type==='success'||this.validatePassword().type==='warning')) {
                axios({
                    method: 'POST',
                    url: 'http://localhost:3001/signup',
                    data: {
                        username: this.state.name,
                        password: this.state.password
                    }
                })
                    .then(res => {
                        this.setState({
                            saved: res.data.message
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            else{
                this.setState({
                    saved:"Check Errors and Try Again.."
                })
            }
        }
        validatePassword(){
            const length = this.state.password.length;
            if(length===0)   return {type:null,visible:'none',strength:0};
             else if(length<8)return {type:'danger',str:"Password must be 8 characters",visible:'',strength:0};
             else if(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?\W).{8,}$/.test(this.state.password)) return {type:'success',str:"Strong Password",visible:'',strength:100};
             else if(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(this.state.password)||/^(?=.*?[a-z])(?=.*?[0-9])(?=.*?\W).{8,}$/.test(this.state.password)||/^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).{8,}$/.test(this.state.password)||/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\W).{8,}$/.test(this.state.password)) return {type:'warning',str:"Medium Strength Password",visible:'',strength:75};
             else if(/^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$/.test(this.state.password)||/^(?=.*?[A-Z])(?=.*?[0-9]).{8,}$/.test(this.state.password)||/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(this.state.password)||/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(this.state.password)||/^(?=.*?[A-Z])(?=.*?\W).{8,}$/.test(this.state.password)||/^(?=.*?\W)(?=.*?[a-z]).{8,}$/.test(this.state.password))return {type:'warning',str:"Weak Password",visible:'',strength:50};
             else if(/(?=.*?[A-Z]).{8,}$/||/(?=.*?[a-z]).{8,}$/||/(?=.*?[0-9]).{8,}$/||/(?=.*?\W).{8,}$/) return {type:'warning',str:"Very Weak Password",visible:'',strength:25};
             else return {type:'warning',str:"Very Weak Password",visible:'',strength:25};
        }
        render(){
            return(
                <div>
                    <PageHeader>Sign Up</PageHeader>
                    <Form>
                        <FormGroup
                            controlId={"usr"}
                            validationState={this.validateUserName().type}>
                            <ControlLabel > User Name</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.name}
                                onChange={this.handleChangeName}
                                placeholder = "Enter Username"
                            />
                            <Alert bsStyle="danger" style={{margin:10,display:this.validateUserName().visible}} > <ul><li>Username should be greater than 5 characters</li><li>User Name must be alpha-numeric and no white space characters</li></ul></Alert>
                        </FormGroup>
                        <FormGroup
                            controlId={"pwd"}
                        >
                            <ControlLabel >Password</ControlLabel>
                            <FormControl
                                type="password"
                                placeholder = "Enter Password"
                                value={this.state.password}
                                onChange={this.handleChangePass}
                            />
                            <Alert bsStyle={this.validatePassword().type} style={{margin:10,display:this.validatePassword().visible}}> {this.validatePassword().str} </Alert>
                            <ProgressBar active now={this.validatePassword().strength} style={{display:this.validatePassword().visible}}/>
                        </FormGroup>
                        <Button onClick={this.sendUserName}>Sign Up</Button>
                        <h4 style={{color:'green'}}>{this.state.saved}</h4>
                    </Form>
                </div>
            );
        }
}
export default SignUp