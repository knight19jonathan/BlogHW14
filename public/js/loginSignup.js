//Login form
console.log("loginSignup.js loaded")

document.querySelector("#login").addEventListener("submit",e=>{
  e.preventDefault();
  const userObj = {
      email:document.querySelector("#login-email").value,
      password:document.querySelector("#login-password").value,
  }
  console.log(userObj)
  fetch("/api/users/login",{
      method:"POST",
      body:JSON.stringify(userObj),
      headers:{
          "Content-Type":"application/json"
      }
  }).then(res=>{
      if(res.ok){
         location.href = "/profile"
      } else {
          alert("successfully logged in")
      }
  })
})
//Signup form
document.querySelector("#signup").addEventListener("submit",e=>{
  e.preventDefault();
  const userObj = {
      name:document.querySelector("#signup-name").value,
      email:document.querySelector("#signup-email").value,
      password:document.querySelector("#signup-password").value,
  }
  console.log(userObj)
  fetch("/api/users",{
      method:"POST",
      body:JSON.stringify(userObj),
      headers:{
          "Content-Type":"application/json"
      }
  }).then(res=>{
      if(res.ok){
         location.href = "/profile"
      } else {
          alert("successfully signed up")
      }
  })
})