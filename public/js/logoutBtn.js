console.log("logoutBtn.js loaded")

document.querySelector("#logout").addEventListener("click", e => {
    e.preventDefault();
    fetch("/api/users/logout", {
        method: "POST",
    }).then(res => {
        if (res.ok) {
            location.href = "/"
        } else {
            alert("You have been logged out.")
        }
    })
})