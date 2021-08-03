
import React,{Component} from 'react';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import JWT from 'jsonwebtoken'
import jsPDF from 'jspdf';
import { Document,Packer,Paragraph } from 'docx';

class Userprofile extends Component {
  constructor(props){
    super(props)
    this.state ={
      userprofile:{}
    }
  }

  async handleLogout(e)
  {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    this.props.history.push("/login");
  }

  async componentDidMount()
  {
    const emaildata = JWT.decode(localStorage.getItem("token"));
    let data = {
      "email":emaildata.email
    }
    const response = await Axios.post(`${process.env.REACT_APP_NDOE_API}/getuser`,data)
    this.setState({userprofile:response?.data?.data})
  }

  

  async handlepdf(e)
  {
    let doc = jsPDF('p','pt');
    doc.text(20,20,"User information");
    doc.setFont('courier')
    let aa = "data";
    doc.text(20,40,[
      this.state.userprofile?.name.toString(),
      this.state.userprofile?.email.toString(),
      this.state.userprofile?.birthdate.toString(),
      this.state.userprofile?.contact.toString(),
      this.state.userprofile?.gender.toString(),
      this.state.userprofile?.skill.toString(),
        this.state.userprofile?.qualification.toString(),
    ]);
    // doc.text(20,40,[
   
    // ]);
    doc.save(`${this.state.userprofile?.name}.pdf`)
  }

render(){
  return(
    <>
    <div className="container" style={{marginTop:"40px"}}>
    <h3 className="container">User Profile
    <button className="btn btn-primary float-right" onClick={(e) => this.handleLogout(e)}>Logout</button></h3>
    <div style={{float:"left"}}>
      <table class="table col-4" style={{marginTop:"30px",width:"50%",justifyContent:'center'}}>
    <thead>
    <tr>
      <th>User</th>
      <th>Information</th>
    </tr>
  </thead>
  <thead>
    <tr>
      <th>Profile</th>
      <td><img src={`${process.env.REACT_APP_NDOE_API}/public/${this.state.userprofile?.name}`} style={{
            width: "66px",
            height: "75px",
            borderRadius:"50%"
      }}/></td>
    </tr>
  </thead>
  <thead>
    <tr>
      <th>Name</th>
      <td>{this.state.userprofile?.name}</td>
    </tr>
  </thead><thead>
    <tr>
      <th>Email</th>
      <td>{this.state.userprofile?.email}</td>
    </tr>
  </thead><thead>
    <tr>
      <th>DOB</th>
      <td>{this.state.userprofile?.birthdate}</td>
    </tr>
  </thead><thead>
    <tr>
      <th>Contact</th>
      <td>{this.state.userprofile?.contact}</td>
    </tr>
  </thead><thead>
    <tr>
      <th>Gender</th>
      <td>{this.state.userprofile?.gender}</td>
    </tr>
  </thead>
  {
    this.state.userprofile && this.state.userprofile?.skill ?
    <thead>
    <tr>
      <th>Skill</th>
      <td>{this.state.userprofile?.skill}</td>
    </tr>
  </thead>
  :
  null
  }
  <thead>
    <tr>
      <th>Qualification</th>
      <td>{this.state.userprofile?.qualification}</td>
    </tr>
  </thead>
</table>


<div style={{float:"left"}}>
  <button className="btn btn-primary" style={{marginLeft:"50px"}} onClick={(e) => this.handlepdf(e)}>PDF download</button>
  <button className="btn btn-primary" style={{marginLeft:"100px"}}>DOCS</button>
</div>
</div>
    </div>
    </>
  );
}
}
export default withRouter(Userprofile);
