let recommend=document.getElementById("recommend");
let outside=document.getElementById("outside");

let outsideEgyptContent=document.getElementById("outsideEgyptContent");
let recommendedContent=document.getElementById("recommendedContent");

recommend.addEventListener("click",function(){
    outside.classList.remove("active");
    this.classList.add("active")
    
    recommendedContent.style.display="flex"
    outsideEgyptContent.style.display="none";

})
outside.addEventListener("click",function(){
    recommend.classList.remove("active");
    this.classList.add("active")

    outsideEgyptContent.style.display="flex"
    recommendedContent.style.display="none"

})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let currentJobIndex = 0; 
const jobsPerPage = 5;
let isLoading = false;

let  jobsJson=[];
async function fetchJobs() {
    try {
        let response = await fetch("../jsonFiles/explore.json"); 
         jobsJson= await response.json(); 
        // console.log(jobsJson);
        renderJobs(jobsJson); 
        InfiniteScroll(jobsJson);
        StaySavedJobs();
    } catch (err) {
        console.error('Error fetching explore jobs:', err);
    }
}

function renderJobs(jobs) {
    const jobsContainer = document.getElementById('jobs-container');
    const placeholderContainer = document.getElementById("placeholder");

    // jobListings.innerHTML = ''; 

    let jobsToDisplay = jobs.slice(currentJobIndex, currentJobIndex + jobsPerPage);

    jobsToDisplay.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.className = 'card  border-0 border-bottom position-relative';

        jobCard.innerHTML = `
        <div class="card-body d-flex flex-row justify-content-between align-items-center">
          <div class=" d-flex flex-column justify-content-start align-items-start col-10">
            <div class="d-flex  gap-3 align-items-center flex-wrap">
                <h5 class="card-title fs-6 cursur title">${job.title}</h5>
                <div class="d-flex gap-2 flex-wrap align-items-center">
                  <span class="badge bdg">${job.employmentType[0]}</span>
                  <span class="badge bdg">${job.employmentType[1]}</span>
               </div>
            </div>
            <p class="card-text text-dark m-0">
              <span class="fw-bold companyName">${job.company}  - </span> 
              <span class="companyLocation fw-bold text-secondary">${job.location}</span> 
            </p>
            <div class="d-flex flex-wrap align-items-center skills">
              <span class="">${job.experienceLevel}.</span>
              ${job.skills.map(skill => `<span class="text-dark me-1">${skill}</span>`).join('.')}
              <span class="ms-3">${job.postedDate}</span>
            </div>
            <div class="d-flex flex-wrap align-items-center gap-4 mt-4 mb-6  ">
               <div class="d-flex gap-1 align-items-center action p-1" id="save" data-index="${job.id}">
                  <i class="fa-regular fa-bookmark savedIcon" ></i>
                  <p class="m-0 fs-6">Save</p>
               </div>
               <div class="d-flex gap-1 align-items-center action p-1 shareAction" data-dialog="${job.id}">
                   <i class="fa-solid fa-share"></i>
                   <p class="m-0 fs-6">Share</p>
               </div>
               <div class="d-flex gap-1 align-items-center action  p-1">
                  <i class="fa-solid fa-eye-slash" ></i>
                  <p class="m-0 fs-6">Hide</p>
               </div>
            </div>
          </div>
          <div class="d-flex  justify-content-center col-1">
             <img src="${job.companyLogo}" class="img-fluid col-12 " alt="logo">
          </div>


          <div class="dialog1 position-absolute " id="dialog-${job.id}">
                     <p class="share">Share</p>
                     <div class="d-flex gap-2 align-items-center my-2">
                      <i class="fa-brands fa-linkedin-in  text-light p-1 " style="background: #0976b4;border-radius:2px"></i>
                      <i class="fa-brands fa-facebook-f  text-light p-1 "  style="background: #3b5998;border-radius:2px;font-size:12px"></i>
                      <i class="fa-brands fa-twitter text-light p-1 "  style="background: #55acee;border-radius:2px;font-size:12px"></i>
                      <i class="fa-solid fa-envelope text-light p-1"style="background: #333333;border-radius:2px;font-size:12px"></i>
                     </div>
                     <form class="d-flex gap-0 align-items-center my-2">
                        <input type="text" value="https://www.linkedin.com/in/ahmed-elsayed-0b0b3b1b4/" id="myInput" class="border-1 border-secondary-subtle p-0 border-end-0">
                        <button class="btn rounded-0 text-light p-0 cursor px-1" style="background:rgb(64, 86, 120)">Copy</button>
                     </form>
                </div>
        </div>
      `;

      jobsContainer.appendChild(jobCard);
    });

    currentJobIndex += jobsPerPage; 
    placeholderContainer.innerHTML = "";
    isLoading = false;    
}

function renderPlaceholder(container) {
    container.innerHTML = `
        <div class="placeholder-glow col-12  mb-3 p-3 rounded">
            <div class="row">
                <div class="col-10">
                    <div class="placeholder col-7"></div>
                    <div class="placeholder col-5"></div>
                    <div class="placeholder col-8"></div>
                    <div class="placeholder col-10"></div>
                    <div class="placeholder col-6"></div>
                </div>
                <div class="col-2 d-flex justify-content-end align-items-center">
                    <div class="placeholder w-100 h-50"></div>
                </div>
            </div>
        </div>
    `;
}


function InfiniteScroll(jobs) {
    window.addEventListener("scroll", () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight -5 && !isLoading) {
        
            if (currentJobIndex < jobs.length) {
                isLoading = true; 
                const placeholderContainer = document.getElementById("placeholder");
                renderPlaceholder(placeholderContainer); 
                setTimeout(() => {
                    renderJobs(jobs); 
                }, 1000); 
            }
        }
    });
}
fetchJobs();

////////////////////////////////////////////////hadel save logic///////////////////////////////////////////////////////////////////////////
const jobscontainer = document.getElementById("jobs-container");
let saveJobs = JSON.parse(localStorage.getItem("saveJobs")) || [];


jobscontainer.addEventListener("click", function (e) {
    if (e.target.closest(".action") && e.target.closest(".action").id === "save") {
        const saveContainer = e.target.closest(".action");
        const index = saveContainer.getAttribute("data-index");

        const currentJob = jobsJson.find((job) => job.id == index);

        const jobExists = saveJobs.find((job) => job.id == currentJob.id);

        if (jobExists) {
            saveJobs = saveJobs.filter((job) => job.id != currentJob.id);
            saveContainer.classList.remove("active");
            saveContainer.querySelector(".savedIcon").classList.remove("fa-solid");
            saveContainer.querySelector(".savedIcon").classList.add("fa-regular");
           
        } else {
            saveJobs.push(currentJob);
            saveContainer.classList.add("active"); 
            saveContainer.querySelector(".savedIcon").classList.remove("fa-regular");
            saveContainer.querySelector(".savedIcon").classList.add("fa-solid");
          
        }
        localStorage.setItem("saveJobs", JSON.stringify(saveJobs));
        // console.log("Saved jobs:", saveJobs);
    }
});

function StaySavedJobs() {
    let saveButtons = document.querySelectorAll("#save");
   
    saveButtons.forEach((btn) => {
        const jobId = btn.getAttribute("data-index");
        const isSaved = saveJobs.some((job) => job.id == jobId); 
        if (isSaved) {
            btn.classList.add("active"); 
            btn.querySelector(".savedIcon").classList.remove("fa-regular");
            btn.querySelector(".savedIcon").classList.add("fa-solid");
        } else {
            btn.classList.remove("active");
            btn.querySelector(".savedIcon").classList.remove("fa-solid");
            btn.querySelector(".savedIcon").classList.add("fa-regular");
        }
    });
}

////////////////////////////////////////////////////////////////////handel share////////////////////////////////////////////////////////////////////////////////
let sharecontainer =null
jobscontainer.addEventListener("click", function (e) {
    if (e.target.closest(".action") && e.target.closest(".action").getAttribute("data-dialog")) {
        sharecontainer = e.target.closest(".action");
        const dialogId = sharecontainer.getAttribute("data-dialog");
       
        const dialog = document.getElementById(`dialog-${dialogId}`);
        if (dialog.style.display === "block") {
            dialog.style.display = "none";
            sharecontainer.classList.remove("active");
            
        } else {
            const allDialogs = document.querySelectorAll(".dialog1");
            allDialogs.forEach((dialog) => {
                dialog.style.display = "none";
                sharecontainer.classList.remove("active");
             });
            dialog.style.display = "block";
            sharecontainer.classList.add("active");
          
        }
    }
});

document.addEventListener("click", function (e) {
    if (!e.target.closest(".action") && !e.target.closest(".dialog1")) {
        const allDialogs = document.querySelectorAll(".dialog1");
        allDialogs.forEach((dialog) => {
            dialog.style.display = "none";
            if( sharecontainer)
                sharecontainer.classList.remove("active");
        });
    }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////show dropdown menu////////////////////////////////////////////////////////////

let menu =document.getElementById("menu");
let dropmenu=document.getElementsByClassName("dropmenu")[0];
menu.addEventListener("click",()=>{
  dropmenu.classList.toggle("d-none")
});

document.addEventListener("click", (event) => {
  if (!dropmenu.contains(event.target) && !menu.contains(event.target)) {
      dropmenu.classList.add("d-none");
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////