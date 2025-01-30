let ApplicationsContainer = document.getElementById("ApplicationsContainer");
let ApplicationDetails = document.getElementById("ApplicationDetails");
let ApplicationsJson = [];
let noApp = document.getElementById("noApp");
let overlay = document.getElementsByClassName("overlay")[0];
async function fetchApplication() {
  try {
    let response = await fetch("../jsonFiles/Applications.json");
    ApplicationsJson = await response.json();
    console.log(ApplicationsJson);
    renderApplications(ApplicationsJson);
  } catch (err) {
    console.error("Error fetching Applications :", err);
  }
}

function renderApplications(Applications) {
  noApp.innerHTML = `Applications(${Applications.length})`;
  Applications.forEach((app, index) => {
    const appCard = document.createElement("div");
    appCard.className = "card   position-relative mb-3 cursur";
    appCard.dataset.index = index;

    appCard.innerHTML = `
        <div class="card-body d-flex flex-row justify-content-between align-items-start col-12">
            <div class="d-flex flex-row gap-3 align-items-center col-8">
               <img src=${app.companyLogo} class="img-fluid col-2" alt="companyImage"/>
               <div class="col-9">
                  <p class="fs-6 fw-semibold mb-1 title"> ${app.title}</p>
                  <p class=" fw-semibold company"> ${app.company} - <span class="text-secondary">${app.location}</span> </p>
                  <span style="font-size:12px " class="text-secondary"> <span class="badge bg-secondary-subtle text-dark me-2 fw-semibold" style="font-size:13px" id="status" >Applied</span>${app.AppliedDate}</span>
               </div>
            </div>
            <div class="col-1 d-flex justify-content-end cursur">
               <i class="fa-solid fa-ellipsis menu-icon"></i>
            </div>
            <div class="d-flex flex-column position-absolute  bg-light w-50  rounded-1 WithdrawArchive d-none " id=${app.id}>
                 <div class="d-flex align-items-center gap-3  p-2" id="Withdraw-${app.id}">
                    <i class="fa-solid fa-rotate-left" style="font-size:12px"></i>
                    <div class="d-flex flex-column ">
                         <p class="m-0 mb-1 fw-semibold " style="font-size:12px">Withdraw application</p>
                         <p class="m-0 mb-1 text-secondary" style="font-size:12px">you won't be a candidate for this opportunity</p>
                    </div>
                 </div>
                 <div class="d-flex align-items-center gap-3 p-2">
                    <i class="fa-solid fa-share" style="font-size:12px"></i>
                    <div class="d-flex flex-column ">
                         <p class="m-0 mb-1 fw-semibold" style="font-size:12px">Archive application</p>
                         <p class="m-0 mb-1 text-secondary" style="font-size:12px">More application to archive</p>
                    </div>
                 </div>
            </div>
            <dialog id="dialog-${app.id}" class="w-50 border-0 rounded-1 dialog1">
                  <header class="d-flex justify-content-between align-items-center border-bottom border-1 border-secandary-subtle mb-3">
                     <p class="mb-1 fw-semibold">Withdraw application</p>
                     <i class="fa-solid fa-x"  id="exit-${app.id}"></i>
                  </header>
                  <p class="text2 col-10" style="font-size:12px">You are withdrawing your application for this job. Once you remove your application, you won't be able to apply again for the same role.</p>
                  <p class="text my-1">Please state your reason for withdrawing this application:</p>
                  <p class="text2 col-10 my-3" style="font-size:12px">Reason will not be shared with the company.</p>
                  <div id="reasonContainer">
                      <div class="form-check mb-2">
                          <input class="form-check-input" type="radio" name="reason" id="mistake">
                          <label class="form-check-label fw-semibold text" for="mistake">
                            I applied by mistake
                          </label>
                      </div>
                      <div class="form-check  mb-2">
                         <input class="form-check-input" type="radio" name="reason" id="changed">
                         <label class="form-check-label fw-semibold text" for="changed">
                            I changed my mind
                         </label>
                       </div>
                      <div class="form-check  mb-2">
                          <input class="form-check-input" type="radio" name="reason" id="anotheropportunity">
                          <label class="form-check-label fw-semibold text" for="anotheropportunity">
                               I got accepted at another opportunity
                          </label>
                      </div>
                      <div class="form-check  mb-2">
                           <input class="form-check-input" type="radio" name="reason" id="notsuitable">
                           <label class="form-check-label fw-semibold text" for="notsuitable">
                                This job is not suitable for me
                           </label>
                       </div>
                       <div class="form-check  mb-2">
                           <input class="form-check-input" type="radio" name="reason" id="Other">
                           <label class="form-check-label fw-semibold text" for="Other">
                                  Other
                            </label>
                     </div>
                  
                  </div>
                  <p class="m-0 fw-bold fs-6">Additional comments:</p>
                  <div class="" id="textareaContainer">
                     <textarea class="col-12 mb-2 "style="height:100px"></textarea>
                  </div>
                  <div class="d-flex">
                     <button class="btn btn-danger rounded-1" id="Withdraw-btn-${app.id}">Withdraw</button>
                     <button class="btn btn-secandary rounded-1" id="cancel-${app.id}">Cancel</button>
                  </div>
            </dialog>
        </div>
       
      `;

    appCard.addEventListener("click", function () {
      document.querySelectorAll(".card").forEach((card) => {
        card.classList.remove("active");
        let Details = card.querySelector(".application-details");
        if (Details) {
          Details.remove();
        }
      });

      appCard.classList.add("active");
      showApplicationDetails(app, appCard);
    });

    ///////////////////////////////////////////////////////////////////////
    let menuIcon = appCard.querySelector(".menu-icon");
    let withdrawArchive = appCard.querySelector(".WithdrawArchive");

    menuIcon.addEventListener("click", function (e) {
      e.stopPropagation();
      document
        .querySelectorAll(".WithdrawArchive")
        .forEach((menu) => menu.classList.add("d-none"));
      withdrawArchive.classList.toggle("d-none");

      ////////////////////////////////////////////////////////////
      let withdraw = document.getElementById(`Withdraw-${app.id}`);
      withdraw.addEventListener("click", function () {
        const dialog = document.getElementById(`dialog-${app.id}`);
        dialog.showModal();
      });

      //////////////////////////////////////////////////////////////////
      let cancelButton = document.getElementById(`cancel-${app.id}`);
      cancelButton.addEventListener("click", function () {
        const dialog = document.getElementById(`dialog-${app.id}`);
        dialog.close();
      });
      let exitButton = document.getElementById(`exit-${app.id}`);
      exitButton.addEventListener("click", function () {
        const dialog = document.getElementById(`dialog-${app.id}`);
        dialog.close();
      });

      ///////////////////////////////////////////////////////////////////////
      let withdrawButton = document.getElementById(`Withdraw-btn-${app.id}`);
      let radioButtons = document.querySelectorAll(`input[name="reason"]`);
      let textarea = document.querySelector(`#dialog-${app.id} textarea`);

      radioButtons.forEach((radio) => {
        radio.addEventListener("change", function () {
          let errorMessage = document.querySelector(
            `#dialog-${app.id} .error-message`
          );
          if (errorMessage) {
            errorMessage.remove();
          }
        });
      });

      textarea.addEventListener("input", function () {
        let textareaError = document.querySelector(
          `#dialog-${app.id} .textarea-error`
        );
        if (textareaError) {
          textareaError.remove();
          textarea.style.border = "1px solid #ced4da";
        }
      });

      withdrawButton.addEventListener("click", function () {
        let radioSelected = false;
        let errorMessage = document.querySelector(
          `#dialog-${app.id} .error-message`
        );
        let textareaError = document.querySelector(
          `#dialog-${app.id} .textarea-error`
        );

        radioButtons.forEach((radio) => {
          if (radio.checked) {
            radioSelected = true;
          }
        });

        if (!radioSelected) {
          if (!errorMessage) {
            let errorDiv = document.createElement("div");
            errorDiv.className = "error-message text-danger text fw-semibold";
            errorDiv.textContent = "Required";
            document.querySelector(`#reasonContainer`).appendChild(errorDiv);
          }
          return;
        }

        if (textarea.value.trim() === "") {
          if (!textareaError) {
            let textareaErrorDiv = document.createElement("div");
            textareaErrorDiv.className =
              "textarea-error text-danger text fw-semibold";
            textareaErrorDiv.textContent =
              "You have to type additional comments";
            textarea.style.border = "1px solid red";
            document
              .querySelector(`#textareaContainer`)
              .appendChild(textareaErrorDiv);
          }
          return;
        }

        appCard.querySelector(".title").style.textDecoration = "line-through";
        let status = appCard.querySelector("#status");
        status.innerHTML = "Withdrawn";
        status.classList.remove("bg-secondary-subtle");
        status.classList.add("bg-danger-subtle");
        status.classList.remove("text-dark");
        status.classList.add("text-danger");

        withdraw.classList.add("diabled");
        let dialog = document.getElementById(`dialog-${app.id}`);
        dialog.close();
      });
    });

    ApplicationsContainer.appendChild(appCard);

    if (index === 0) {
      appCard.classList.add("active");
      showApplicationDetails(app, appCard);
    }
  });
}

document.addEventListener("click", function () {
  document
    .querySelectorAll(".WithdrawArchive")
    .forEach((menu) => menu.classList.add("d-none"));
});

fetchApplication();

function showApplicationDetails(app, appCard) {
  let detailsDiv = document.createElement("div");
  detailsDiv.className =
    "application-details   bg-white  p-lg-1 p-0 rounded-1 w-75 ";

  detailsDiv.innerHTML = `
        <div class=" p-lg-2 p-0 border-0">
            <header class="d-flex justify-content-between align-items-center d-flex d-lg-none  bg-primary text-light p-3  mb-2  w-100">
               <div class="d-flex align-items-center gap-2 col-10">
                  <i class="fa-solid fa-eye"  ></i>
                  <p class="m-0 fw-semibold">Application Preview</p>
               </div>
               <i class="fa-solid fa-x col-2 d-flex justify-content-end " id="closeDetails"></i>
            </header>
            <h4 class="fw-bold fs-4 text-primary px-2">${app.title}</h4>
            <div class="d-flex text mb-1 px-2">
               <p class="text-dark fw-semibold m-0">${app.company} - </p>
               <p class="text-secondary fw-semibold m-0"> ${app.location}</p>
            </div>
            <p class="m-0 text-secondary px-2 posted">Posted ${
              app.postedDate
            }</p>
           
            <div class="alert alert-danger p-1 ps-3  rounded-1 my-4 mx-3 d-flex align-items-center gap-2" role="alert">
               <i class="fa-solid fa-bars-staggered" style="font-size:12px"></i>
               <p class=" m-0" style="font-size:12px">Your profile ranks low among other applicants</p>
            </div>

            <div class="d-flex row mx-2">
              <div class="d-flex flex-column col-lg-2 col-md-1 col-sm-1 col-1 align-items-center">
                 <p class="m-0 text-secondary fw-bold fs-6">${
                   app.noOfApplicants
                 }</p>
                 <p class="m-0" style="font-size:12px">Applicants</p>
              </div>
              <div class="d-flex flex-column col-lg-1 col-md-1 col-sm-2 col-2 align-items-center">
                 <p class="m-0 text-secondary fw-bold fs-6">${app.noOfViews}</p>
                 <p class="m-0" style="font-size:12px">Views</p>
              </div>
              <div class="d-flex flex-column col-lg-4 col-md-2 col-sm-3 col-4 align-items-center justify-content-center  border-start border-secondary-subtle border-1 ">
                 <p class="m-0 text-secondary fw-bold fs-6">${
                   app.inConsideration
                 }</p>
                 <p class="m-0 text-success" style="font-size:12px">In Consideration</p>
              </div>
              <div class="d-flex flex-column col-lg-4 col-md-2  col-sm-2 col-4 align-items-center justify-content-center border-start border-secondary-subtle border-1">
                 <p class="m-0 text-secondary fw-bold fs-6">${
                   app.notSelected
                 }</p>
                 <p class="m-0 text-danger" style="font-size:12px">Not Selected</p>
              </div>
            </div>

            <div class="d-flex align-items-center justify-content-between my-3 px-2"> 
              <p class="m-0 fs-6 fw-semibold text-dark">Screening questions</p>
              <p class="m-0 fs-6 fw-semibold text-dark">${
                app.QuestionsRequire.length
              }</p>
            </div>
            <div>
            ${app.QuestionsRequire.map(
              (q) => `
                <div class="question col-12 px-2">
                    <div class="d-flex align-items-start justify-content-between">
                        <p class=" fw-semibold text m-0 col-xl-8 col-md-8" >${q}</p>
                        <div class="d-flex align-items-center gap-2  justify-content-end text-primary col-lg-4 col-md-3 ">
                           <i class="fa-solid fa-pen" style="font-size:12px"></i>
                           <p class="m-0 text">Edit Answers</p>
                        </div>
                    </div>
                </div>
                 <div class="mt-1 mb-4 px-2">
                      ${
                        q.trim().toLowerCase().startsWith("are")
                          ? `
                        <div class="d-flex gap-3">
                          <label class="d-flex align-items-center gap-1">
                             <input type="radio" name="${q}" value="Yes"> Yes
                          </label>
                          <label class="d-flex align-items-center gap-1">
                            <input type="radio" name="${q}" value="No"> No
                         </label>
                       </div>`
                          : `<textarea class="form-control rounded-0" ></textarea>`
                      }
               </div>
            `
            ).join("")}
         </div>
            
        </div>
    `;

  appCard.appendChild(detailsDiv);
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "overlay";

    document.body.appendChild(overlay);
  } else {
    overlay.classList.remove("none");
  }
}
////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  if (overlay) {
    overlay.addEventListener("click", function () {
      detailsDiv.remove();
      overlay.classList.add("none");
      appCard.classList.remove("active");
    });
  }
});
///////////////////////////close details app ///////////////////////////////////////////////////////////
document.addEventListener("click", function (event) {
  let activeCard = document.querySelector(".card.active");
  if (event.target.closest("#closeDetails")) {
    let details = activeCard.querySelector(".application-details");
    if (details) {
      details.remove();
    }
    if (overlay) {
      overlay.classList.add("none");
    }
    activeCard.classList.remove("active");
  }
});

///////////////////////////////show dropdown menu////////////////////////////////////////////////////////////

let menu = document.getElementById("menu");
let dropmenu = document.getElementsByClassName("dropmenu")[0];
menu.addEventListener("click", () => {
  dropmenu.classList.toggle("d-none");
});

document.addEventListener("click", (event) => {
  if (!dropmenu.contains(event.target) && !menu.contains(event.target)) {
    dropmenu.classList.add("d-none");
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////
