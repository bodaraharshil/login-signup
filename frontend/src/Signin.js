

import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
class Signin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
         }
    }

    
    async handleChange(event) {
        this.setState({[event.target.name] : event.target.value });
    }

    async handleSubmit(e){
        e.preventDefault();
        const formdata = new FormData();
        if(!this.state.email)
        {
            toast.error("Email is required")
        }
        else if(!this.state.password)
        {
            toast.error("Password is required")
        }
        else
        {
            let formdata = {
                "email":this.state.email,
                "password":this.state.password
            }
            await Axios.post(`${process.env.REACT_APP_NDOE_API}/login`,formdata,{
                headers:{
                    "Content-Type": "application/json"
                }
            }).then((data) => {
                if(data.data.error){
                    toast.error(data.data.error)
                }
                else{
                    localStorage.setItem("token",data.data.token)
                    localStorage.setItem("email",data.data.email)
                    toast.success(data.data.message)
                    this.props.history.push("/");
                }
            }).catch((error) => {
                console.log("error",error)
             })
        }

    }

    render() {
        return (

        <div className="form2">
            <div className="container">
                <div className=" row">
                    <div className="col-sm">
                        
                        <form className="SignUp form" onSubmit={(e) => this.handleSubmit(e)}>
                            <h2> Sign In</h2>
                          
                            <div className="form-group">

                            
                            
                            <input className="form-control" type="text" placeholder="Email" name="email" onChange={(e) => this.handleChange(e)}/>
                        

                            </div>
                            <div className=" form-group">
                                <input input className="form-control" type="password" placeholder="Password" name="password" onChange={(e)=> this.handleChange(e)}/>

                            </div>
                           
                            <div className="form-group">
                                <button className = "btn btn-primary btn-block "type="submit">Submit </button>

                            </div>
                            
                                   <div>
            
                       <Link to = '/signup'> Sign Up </Link>
                       </div>
           
                        </form>
                    </div>
                </div>
            </div>
        </div>

            );
        }
    }
    export default withRouter(Signin) ;