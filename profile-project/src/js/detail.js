import { endpoints } from "./api.js";
import controller from "./request.js";

const userDetailRegister = document.querySelector("#user-detail");
window.addEventListener("load", async function (e) {
    const userIDs = JSON.parse(this.localStorage.getItem("userID"));
    const apiUser = await controller.getAll(endpoints.users);
    const checkValid = apiUser.data.find((x) => x.id == userIDs);
    if (checkValid) {
        userDetailRegister.innerHTML = "";
        userDetailRegister.innerHTML += `
     <section style="height: 35rem; padding-top: 4rem;" >    
  <div class="container mt-5" >
    <div class="row">
      <div class="col-md-4">
        <div class="card">
          <div class="card-body text-center">
            <img src=${checkValid.profileImage} alt="User Image" class="img-fluid rounded-circle mb-3" style="height:10rem;">
            <h5 class="card-title">${checkValid.fullName}</h5>
            <p class="card-text">${checkValid.role}</p>
                   <a href="./settings.html" class="btn btn-primary" class="update">Update</a>
          </div>
        </div>
      </div>
            <div class="col-md-8">
           <div class="card" style="height:20rem; ">        
           <div class="card-body">
            <ul class="nav nav-tabs" id="profileTabs" role="tablist">
              <li class="nav-item" role="presentation">
                <a class="nav-link active" id="about-tab" data-bs-toggle="tab" href="#about" role="tab" aria-controls="about" aria-selected="true">About</a>
              </li>
            </ul>
            <div class="tab-content mt-3" id="profileTabsContent">
              <div class="tab-pane fade show active" id="about" role="tabpanel" aria-labelledby="about-tab">
                <h5>About Me</h5>
                <p>${checkValid.bio}</p>
              </div>
          </div>
      </div>
    </div>
      </div>   
  </div>
</section>
        `;
    }
})