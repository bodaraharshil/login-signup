import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from "axios";
import { toast } from 'react-toastify';
import {withRouter } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { Multiselect } from 'multiselect-react-dropdown';
// import Dropdown from './Dropdown';

// import './mystyle.css';
class SignUp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            birthdate:"",
            email: '',
            contact:"",
            gender:"",
            qualification:"",
            profile:"",
            skill:"",
            password: '',
            confirmpassword: '',
            Toggle: false,
         }
        }
   
        async handleChange(event) {
            this.setState({[event.target.name] : event.target.value });
        }

        async handleImage(event) {
            this.setState({[event.target.name] : event.target.files[0] });
        }

        async handleSubmit(e){
            e.preventDefault();
            const formdata = new FormData();
            if(!this.state.name)
            {
                toast.error("Name is required")
            }
            else if(!this.state.birthdate)
            {
                toast.error("Birth date is required")
            }
            else if(!this.state.email)
            {
                toast.error("Email is required")
            }
            else if(!this.state.contact)
            {
                toast.error("Contact is required")
            }
            else if(!this.state.gender)
            {
                toast.error("Gender is required")
            }
            else if(!this.state.qualification)
            {
                toast.error("Qualification is required")
            }
            else if(!this.state.profile)
            {
                toast.error("Profile is required")
            }
            else if(!this.state.password)
            {
                toast.error("Password is required")
            }
            else if(!this.state.confirmpassword)
            {
                toast.error("Confirm Password is required")
            }
            else if(this.state.password  !== this.state.confirmpassword)
            {
                toast.error("Password doesn't match")
            }
            else
            {
                formdata.append("name",this.state.name)
                formdata.append("email",this.state.email)
                formdata.append("birthdate",this.state.birthdate)
                formdata.append("contact",this.state.contact)
                formdata.append("gender",this.state.gender)
                formdata.append("qualification",this.state.qualification)
                formdata.append("skill",this.state.skill)
                formdata.append("profile",this.state.profile)
                formdata.append("password",this.state.password)
                const response = await Axios.post(`${process.env.REACT_APP_NDOE_API}/signup`,formdata)
                if(response.data.error)
                {
                    toast.error(response.data.error)
                }
                else
                {
                    toast.success(response.data.message)
                    this.props.history.push("/login");
                }
            }

        }

        //   handleInput(event) {
        //     this.setState({
        //       name: event.target.value
        //     });
        //   }
    
        // submitSignup = () => {
           
        //     if (this.state.Toggle === true) {
        //         alert("Firstname:" + this.state.FirstName + "  Lastname:" + this.state.LastName + "  Numbers:" + this.state.Number + "  Licene Number:" + this.state.drivingLicene + " Selected Country:" + this.state.Country)
    
        //     } else {
        //         alert("Firstname:" + this.state.FirstName + "  Lastname:" + this.state.LastName + "  Numbers:" + this.state.Number);
    
        //     }
        // }





    toggleInput = (e) => {
        if (e.target.checked === true) {
            this.setState({
                Toggle: true
            })

        } else {
            this.setState({
                Toggle: false
            })

        }
    }
    liceneNumber = (e) => {
        this.setState({ drivingLicene: e.target.value });

    }
    render() {
      return (

        <div>
            
            <div className="container">
                <div className=" row">
                    <div className="col-sm">
                        {/* <h2> Sign  UP</h2> */}
                        <form className="SignUp form" onSubmit={(e) => this.handleSubmit(e)}>
                            <h2>Sign UP</h2>
                            {/* <label > Fill the details</label> */}
                            <div className="form-group">

                            
                            
                            <input className="form-control" type="text" name="name" placeholder="Name" onChange={(e) =>this.handleChange(e)}/>
                        

                            </div>
                            <div className=" form-group">
                               
                               <input type="date" className="form-control" name="birthdate" onChange={(e) => this.handleChange(e)}/>

                            </div>
                            <div className="form-group">
                            <input input className="form-control" type="email" name="email" onChange={(e) =>this.handleChange(e)} placeholder="Email"/>     

                            </div>
                            <div className="form-group">
                            <input input className="form-control" type="text" placeholder="Contact" name="contact" onChange={(e) => this.handleChange(e)}/>   

                            </div>
                           <div className="form-group" name="gender" onChange={(e) => this.handleChange(e)}>
                               <label className="form-check-inline" >Gender</label>
                           {/* </div> */}
                           {/* <div className = "form-group"> */}
                          
                           
                              

                           
                         Male <input className ="form-check-input-inline"  type="radio" name="gender" value="male" />                                                                                                        
                              Female <input className = "form-check-inline-input" type="radio" name="gender" value="female"/>
                              


                               </div>
                               <div className="form-group">
                              <select className="form-control" name="qualification" onChange={(e) => this.handleChange(e)}>
                                  <option value="Max Qualification">Max Qualification</option>
                                  <option value="Post Graduation">Post Graduation</option>
                                  <option value="Under Graduation">Under Graduation</option>
                                  <option value="12th">12th</option>
                                  <option value="10th">10th</option>
                                 
                              </select>
                              {/* <div className = "form-check-inline" > */}<br/>
                             Do you have skills <input className = "form-check-input-inline"
                              type = "checkbox"
                            value = "Toggle"
                           onChange = { this.toggleInput }/>
                               
                              </div>
                             
                           
          
                          
                          
            
                              

               { this.state.Toggle ?
                              <div className="form-group">
                             < input type = "text"
                className = "form-control"
                placeholder = "Enter Your Skills"
                name="skill"
                onChange={(e) => this.handleChange(e)}
                />
                </div>: null}        
                <div className="form-group">
                          <input input className="form-control" type="file" name="profile" onChange={(e) => this.handleImage(e)} />

                            </div>                        
                            <div className="form-group">
                          <input input className="form-control" type="password" placeholder="Password" name="password" onChange={(e) => this.handleChange(e)}/>

                            </div>
                            <div className="form-group">
                          <input input className="form-control" type="password" placeholder="Confirm Password" name="confirmpassword" onChange={(e) => this.handleChange(e)}/>
                          </div>
                            <div className="form-group">
                                <button className = "btn btn-primary btn-block "type="submit">Submit </button>
                                

                            </div>
                            <div>
                    <Link to = '/login' className = 'link' > Sign In </Link>
                            
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

            );
        }
    }
    export default withRouter(SignUp);