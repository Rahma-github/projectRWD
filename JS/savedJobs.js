let saveJobs = JSON.parse(localStorage.getItem('saveJobs')) || [];
let savedJobsContainer = document.getElementById('savedJobsContainer');

console.log(saveJobs);

if (saveJobs.length === 0) {
    let noSavedJobsconatiner = document.getElementById('noSavedJobs');
    noSavedJobsconatiner.innerHTML = `
        <img src="../image/noSavedJobs.svg" alt="No Saved Jobs" class="img-fluid mb-5">
        <h1 class="fs-4 fw-bold ">No saved opportunities yet!</h1>
        <p class="fs-6 ">Not ready to apply? Save the opportunities you are interested in.</p>
        <button class="btn btn-primary px-5 rounded-0  " id="Explore">Explore</button>
    `;
}
else{
    let noOfSaved= document.createElement('h3');
    noOfSaved.className = 'fs-5 fw-bold mb-3';
    noOfSaved.innerHTML = `${saveJobs.length} Active Saved Jobs`;
    savedJobsContainer.appendChild(noOfSaved);
    renderSavedJobs();
    
}

function renderSavedJobs() {
    saveJobs.forEach(job => {
        const jobSavedCard = document.createElement('div');
        jobSavedCard.className = 'card  border-0 border-bottom m-0 ';

        jobSavedCard.innerHTML = `
        <div class="card-body d-flex flex-row justify-content-between align-items-center p-3">
          <div class=" d-flex flex-column justify-content-start align-items-start col-10">
            <div class="d-flex  gap-3 align-items-center flex-wrap">
                <h5 class="card-title fs-6 cursur title">${job.title}</h5>
                <div class="d-flex gap-2 flex-wrap align-items-center">
                  <span class="badge bdg text-dark fw-light">${job.employmentType[0]}</span>
                  <span class="badge bdg text-dark fw-light">${job.employmentType[1]}</span>
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
               <div class="d-flex gap-1 align-items-center active action p-1 " id="unsave" data-index="${job.id}" >
                  <i class="fa-solid fa-bookmark savedIcon " ></i>
                  <p class="m-0 fs-6">UnSave</p>
               </div>
               <div class="d-flex gap-1 align-items-center action p-1 shareAction" data-dialog="${job.id}">
                   <i class="fa-solid fa-share"></i>
                   <p class="m-0 fw-semibold">Share</p>
               </div>
            </div>
          </div>
          <div class="d-flex  justify-content-center col-1">
             <img src="${job.companyLogo}" class="img-fluid col-12 " alt="logo">
          </div>
          <dialog id="dialog-${job.id}" class="p-3 border-0 w-50" >
             <h3 class="fs-6 fw-bolder">Save Job</h3>
             <p class="fs-6 ">Do you want to unsave this job?</p>
             <div class="d-flex gap-3 justify-content-end">
                <button class="btn btn-primary  confirmUnsave"  data-index="${job.id}">Unsave</button>
                <button class="btn btn-secondary  cancelUnsave" >Cancel</button>
             </div>
          </dialog>
          
        </div>
      `;

      savedJobsContainer.appendChild(jobSavedCard); 
    });
}
////////////////////////////////////////////////////handel navigate to explore/////////////////////////////////////
let Explore = document.getElementById('Explore');
if (Explore) {
    Explore.addEventListener('click', () => {
        location.href = '../HTML/explore.html';
    });
}
///////////////////////////////////////////////////handel unsaved////////////////////////////////////////////////////////////////
let unsaveIndex = null;
let dialog = document.getElementById('dialog');

savedJobsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('confirmUnsave')) {
        const jobId = e.target.getAttribute('data-index'); 

        saveJobs = saveJobs.filter(job => job.id != jobId); 
        localStorage.setItem('saveJobs', JSON.stringify(saveJobs));

        const dialog = document.getElementById(`dialog-${jobId}`);
        dialog.close(); 
        
        location.reload(); 
    } else if (e.target.classList.contains('cancelUnsave')) {
        const dialog = e.target.closest('dialog'); 
        dialog.close(); 
    }
});


savedJobsContainer.addEventListener('click', (e) => {
    if (e.target.closest('.action') && e.target.closest('.action').id === 'unsave') {
        const unsaveContainer = e.target.closest('.action');

        const jobId = unsaveContainer.getAttribute('data-index'); 
        unsaveIndex = saveJobs.findIndex(job => job.id == jobId); 
        const dialog = document.getElementById(`dialog-${jobId}`);
        dialog.showModal(); 
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
