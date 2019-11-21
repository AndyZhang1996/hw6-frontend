import React, { Component } from 'react';
import './Registration.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect, withRouter } from "react-router-dom"

export class Registration extends Component {
  constructor(props) {
    super(props)


    this.state = {
      accountName: "",
      emailAddress: "",
      phoneNumber: "",
      dob: "",
      ageValid: "",
      zipCode: "",
      password: "",
      passwordConfrm: "",
      passwordValid: "",
      userId: "",
      redirectMain: false
    }

    this.change = this.change.bind(this)
    this.ageValidation = this.ageValidation.bind(this)
    this.passwordValidation = this.passwordValidation.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.cancelForm = this.cancelForm.bind(this)
    // this.fetchUsers = this.fetchUsers.bind(this)
    // this.checkUniqueUserName = this.checkUniqueUserName.bind(this)

    // this.fetchUsers()
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  ageValidation = () => {
    let dob = this.state.dob
    dob = dob.replace(/\D/g, '');              //convert to string and strip of the '-'
    var birthYear = Number(dob.substring(0, 4));
    console.log(birthYear)
    console.log(typeof birthYear)
    var birthMonth = Number(dob.substring(4, 6)) - 1;
    var birthDay = Number(dob.substring(6));
    var current = new Date();
    var currentYear = current.getFullYear();
    var currentMonth = current.getMonth();
    var currentDay = current.getDate();
    var age = currentYear - birthYear;
    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
      age--;
    }
    let ret = false;
    if (age < 18) {
      this.setState({ ageValid: false })
    } else {
      this.setState({ ageValid: true })
      ret = true;
    }
    return ret;
  }

  passwordValidation = e => {
    let password = document.getElementById("password");
    let passwordConfrm = document.getElementById("passwordConfrm");

    let ret = false;
    if (password.value === passwordConfrm.value) {
      this.setState({ passwordValid: true })
      ret = true;
    } else {
      this.setState({ passwordValid: false })
    }

    return ret;

  }

  cancelForm = () => {
    this.setState({
      accountName: "",
      emailAddress: "",
      phoneNumber: "",
      dob: "",
      ageValid: "",
      zipCode: "",
      password: "",
      passwordConfrm: "",
      passwordValid: ""
    })
  }

//   fetchUsers = async () => {
//     const returned = await fetch(
//         'https://jsonplaceholder.typicode.com/users'
//     );
//     const items = await returned.json()
//     let userNamesArray = []
//     items.map(user => {
//       userNamesArray.push(user.username)
//     })
//     console.log(userNamesArray)
//     if (localStorage.getItem("userNames") === null) {
//       localStorage.setItem("userNames", userNamesArray)
//     }
// }

// checkUniqueUserName = () => {
//   let userNames = localStorage.getItem("userNames").split(",")
//   let unique = true
//   userNames.map(userName => {
//     if(this.state.accountName === userName) {
//       unique = false
//     }
//   })

//   if (unique == true){
//     userNames.push(this.state.accountName)
//     localStorage.setItem("userNames", userNames)
//   } else{
//     alert("Account name already exists")
//   }
//   return unique
// }

getUserName = () => {
    this.setState({ userName: this.state.users[this.state.userId - 1].username })
}

  // handleSubmit = e => {

  //   e.preventDefault();
  //   //this.cancelForm()
  // }

  handleFormSubmit = (e) => {
    e.preventDefault();
  }

  // handleSubmit = (e) => {
  handleSubmit = (e) => {
    // e.preventDefault()
    //this.setState({ ageValid: true })
    //return;
    e.preventDefault()
    let ageValid = this.ageValidation()
    let passwordValid = this.passwordValidation()
    console.log(ageValid + ' ' + passwordValid)
    // this.setState({ageValid:true}, () => console.log(this.state.ageValid))
    // this.setState({ ageValid: true })

    // console.log(this.state.ageValid)
    // console.log(this.state.passwordValid)
    let dobMsg = document.getElementById("dobMsg")
    let passwordMsg = document.getElementById("passwordMsg")
    if (ageValid === false) {

      dobMsg.style = "display: inline"
      dobMsg.innerHTML = "Only people who are 18 years old or older can register."
    } else {
      dobMsg.style = "display: None"
    }

    if (passwordValid === false) {
      passwordMsg.style = "display: inline"
      passwordMsg.innerHTML = "password does not match!"
    } else {
      passwordMsg.style = "display: None"
    }
    console.log("in handleClick!!!!!!!!!!")


    //check if is a unique userName
    // const unique = this.checkUniqueUserName()




    if (ageValid === true && passwordValid === true) {
      this.addNewUser()
      


      // localStorage.setItem("userId", this.state.userId)
      // localStorage.setItem('userValid', true);
      // this.setState({ : true })                //comment out then no redirect 
      // console.log("in inner!!!!!!!!!!")
 
      // this.logined = true;

    // localStorage.setItem('logined', 't');
      
      // e.preventDefault()
    }
  }

  addNewUser = async () => {
    let baseUrl = 'http://andybookserver.herokuapp.com/'
    console.log("in add new user!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    console.log(this.state.accountName)
    console.log("dob", typeof this.state.dob)
    console.log("dob", this.state.dob)
    console.log(typeof this.state.password)

    let dob = this.state.dob
    dob = dob.replace(/\D/g, '')               //convert to string and strip of the '-'
    let birthYear = Number(dob.substring(0, 4))
    console.log(birthYear)
    console.log(typeof birthYear)
    let birthMonth = Number(dob.substring(4, 6)) - 1
    let birthDay = Number(dob.substring(6))

    const response = await fetch(baseUrl + 'register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.state.accountName,
                                   email: this.state.emailAddress,
                                   dob: new Date(birthYear, birthMonth, birthDay).getTime().toString(),
                                   zipcode: this.state.zipCode,
                                   password: this.state.password}),
        })
    let responseMsg = document.getElementById("responseMsg")
    

    if(response.status == 400){
      const json = await response.json()
      responseMsg.style = "display: inline; color: red; font-size: 25px"
      responseMsg.innerHTML = json.Msg

      
      
      console.log(json.Msg)
    }else{
      const json = await response.json()
      responseMsg.style = "display: inline; color: green; font-size: 25px"
      responseMsg.innerHTML = json.result
      this.setState({redirectMain: true})


      // alert(json.result)
      console.log(json.result)
      console.log(this.state.redirectMain)
    }
  }


  render() {
    return (
      <div className="registration">
        <h1>Register</h1>
        <div className="ml-5 mb-2"><span id="responseMsg"></span></div>
        {/* {this.state.redirectMain */}
        {/* {localStorage.setItem('userId', 1)} */}
        {/* {localStorage.setItem('userValid', true)} */}
        {/* {this.state.redirectMain && <Redirect to='/Main' push />} */}
          {/* { this.state.redirectMain && <Redirect to='/Main' push />} */}
        <form className="registrationForm" onSubmit={this.handleSubmit}>
        {/* <form className="registrationForm" onSubmit={e => e.preventDefault()}> */}
          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
      
            <div className="row ml-5">
              <label>Account Name:</label>
              <input
                name="accountName"
                placeholder="enter account name"
                pattern="^[^0-9][a-zA-Z0-9]*$"
                value={this.state.accountName}
                onChange={this.change}
                title="upper or lower case letters and numbers, may not start with a number"
                required
              />
              
            </div>
            <div className="row ml-5 mt-2">
              <label>Email Address:</label>
              <input
                name="emailAddress"
                placeholder="enter email address"
                value={this.state.emailAddress}
                type="email"
                onChange={this.change}
                required
              />
            </div>

            <div className="row ml-5 mt-2">
              <label>phone Number:</label>
              <input
                name="phoneNumber"
                placeholder="enter phone number"
                pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                value={this.state.phoneNumber}
                type="tel"
                onChange={this.change}
                title="The format should be xxxxxxxxxx"
                required
              />
            </div>

            <div className="row ml-5 mt-2">
              <label>Date of Birth:</label>
              <input
                name="dob"
                value={this.state.dob}
                type="date"
                onChange={this.change}
                required
              />
              <span id="dobMsg"></span>
            </div>


            <div className="row ml-5 mt-2">
              <label>Zipcode:</label>
              <input
                name="zipCode"
                placeholder="enter zip code"
                pattern="[0-9]{5}"
                value={this.state.zipCode}
                type="text"
                onChange={this.change}
                title="should be 5 digits"
                required
              />
            </div>

            <div className="row ml-5 mt-2">
              <label>Password:</label>
              <input
                name="password"
                id="password"
                placeholder="enter password"
                value={this.state.password}
                type="password"
                onChange={this.change}
                required
              />
            </div>

            <div className="row ml-5 mt-2">
              <label>re-enter:</label>
              <input
                name="passwordConfrm"
                id="passwordConfrm"
                placeholder="re-enter password"
                value={this.state.passwordConfrm}
                type="password"
                onChange={this.change}
                onKeyUp={this.passwordValidation}
                required
              />
              <span id="passwordMsg"></span>
            </div>
          
            


            <div className="button">
              {/* <button className="btn btn-primary btn-sm mt-2" onClick={this.handleSubmit}>Register</button> */}
              <button className="btn btn-primary btn-sm mt-2" type="submit">Submit</button>
              <button className="btn btn-primary btn-sm ml-1 mt-2" onClick={this.cancelForm}>Clear</button>
            </div>
          </div>
        </form>
      </div>
    )




  }
}

export default Registration
