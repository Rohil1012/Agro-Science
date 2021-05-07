const inputs = document.querySelectorAll(".input");


function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});




//.........
const form = document.querySelector("form");
const emailError = document.querySelector(".email25.error");
 const passwordError = document.querySelector(".password.error");

form.addEventListener("submit", async (e) => {
	e.preventDefault();
	
  //reset errors
//  emailError.textContent = "";
//  passwordError.textContent = "";

  //get values
  const email = form.email.value;
  const password = form.password.value;
  
  try {
    const res = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    if (data.errors) {
      emailError.textContent = data.errors.email;
      passwordError.textContent = data.errors.password;
    }
    if (data.user) {
      location.assign("/");
    }
  } catch (err) {
    console.log(err);
  }
	
});