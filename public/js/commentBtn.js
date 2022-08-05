console.log("commentBtn.js loaded")


document.querySelector("#add-comment").addEventListener("submit",e=>{
    e.preventDefault();
    const commObj = {
        description:document.querySelector("#comment-description").value,
    }
    console.log(commObj)
    fetch("/api/comments",{
        method:"POST",
        body:JSON.stringify(commObj),
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
