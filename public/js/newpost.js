console.log("newpost.js loaded")

document.querySelector("#new-proj").addEventListener("submit",e=>{
    e.preventDefault();
    const projObj = {
        name:document.querySelector("#name").value,
        description:document.querySelector("#description").value,
    }
    console.log(projObj)
    fetch("/api/posts",{
        method:"POST",
        body:JSON.stringify(projObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.reload()
        } else {
            alert("error or something")
        }
    })
})

