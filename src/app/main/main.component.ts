import { Component } from '@angular/core';
import {  DETAILED,ALL_JOBS} from '../../mocks';
import { Router } from '@angular/router';

// Define interfaces for job data
interface Job {
  id: number;
  companyName: string;
  title: string;
  companyLogo: string;
  reference: string;

}

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

 jobs : Job[]= ALL_JOBS;
activeTab: string = 'Jobs'; // Initialize active tab
favoriteJobs: Job[] = [];
jobCardsHTML!: string;
Alljobsdata =[DETAILED]




constructor(private router: Router) {}
ngOnInit(): void {

  if (location.href.includes('/favourite')) {
    this.activeTab = 'favourite';
    const storedFavoriteJobs = localStorage.getItem('favoriteJobs');

// Check if favoriteJobs exists in localStorage
if (storedFavoriteJobs) {
  // Parse the stored string back to an array
  this.favoriteJobs = JSON.parse(storedFavoriteJobs);
  this.updateJobCardsHTML();
}
  } else {
    // Current URL does not include "/favourite"
    // Add alternative logic here
    const storedFavoriteJobs = localStorage.getItem('favoriteJobs');
    if (storedFavoriteJobs) {
      // Parse the stored string back to an array
      this.favoriteJobs = JSON.parse(storedFavoriteJobs);
    }
    this.activeTab = 'jobs';

  }
}
navigateToJobs(type: string) {
  this.router.navigate(['/'+type]);
}
generateJobCards(){
  let jobCardsHTML = '';
  for (const job of this.jobs) {
    const jobId = job.id;
    const jobWithMatchingId = this.favoriteJobs.find(job => job['id'] === jobId);
if(jobWithMatchingId){
    jobCardsHTML += `
      <div class="job-card">
        <img class="company-logo" src="${job?.companyLogo}" alt="Company Logo">
        <div class="job-details">
          <p class="title ${jobId}">${job?.title}</p>
          <p class="info">
            <span class="reference">Company: ${job?.companyName}</span>
            <span class="location">Reference: ${job?.reference}</span>
          </p>
        </div>
        <span class="icon-star star"  style="color: yellow; cursor: pointer;">${jobId}</span>
      </div>
    `;

  }else{
    jobCardsHTML += `
    <div class="job-card">
      <img class="company-logo" src="${job?.companyLogo}" alt="Company Logo">
      <div class="job-details">
        <p class="title ${jobId}">${job?.title}</p>
        <p class="info">
          <span class="reference">Company: ${job?.companyName}</span>
          <span class="location">Reference: ${job?.reference}</span>
        </p>
      </div>
      <span class="icon-star"  style="color: yellow; cursor: pointer;">${jobId}</span>
    </div>
  `;

  }

} return jobCardsHTML;}

addToFavorites(jobId:Number) {
  let favJob: Job | undefined;
// Find the job with the given jobId
const favJobIndex = this.jobs.findIndex(job => job.id === jobId);
if (favJobIndex !== -1) {
  favJob = this.jobs[favJobIndex];
  if (favJob) {
    if (this.favoriteJobs.some(job => job['id']=== jobId)) {
      // If the job is already in favoriteJobs, remove it
      this.favoriteJobs = this.favoriteJobs.filter(job => job['id'] !== jobId);
      localStorage.setItem('favoriteJobs', JSON.stringify(this.favoriteJobs));
    } else {
      // If the job is not in favoriteJobs, add it
      this.favoriteJobs.push(favJob);
      localStorage.setItem('favoriteJobs', JSON.stringify(this.favoriteJobs));
    }
    // Update the jobCardsHTML
    this.updateJobCardsHTML();
  }
}

}

updateJobCardsHTML() {
  // Clear the jobCardsHTML
  this.jobCardsHTML = '';
  // Loop through the favoriteJobs and generate HTML for each job
  for (const job of this.favoriteJobs) {
    const jobId = job['id'];
    this.jobCardsHTML += `
      <div class="job-card">
        <img class="company-logo" src="${job['companyLogo']}" alt="Company Logo">
        <div class="job-details">
          <p class="title">${job['title']}</p>
          <p class="info">
            <span class="reference">Company: ${job['companyName']}</span>
            <span class="location">Reference: ${job['reference']}</span>
          </p>
        </div>
      </div>
    `;
      }

}


// Inside your component class
handleIconStarClick(event: MouseEvent): void {
const target = event.target as HTMLElement;
if (target.classList.contains('title')) {
  const otherClasses = Array.from(target.classList).filter(className => className !== 'title');

  this.router.navigate(['/job/'+otherClasses[0]]);

}

if (target.classList.contains('icon-star') && !target.classList.contains('star')) {
  // Icon-star element clicked, perform your actions here
  this.addToFavorites(Number(target.textContent));
  target.classList.add("star")

}else if(target.classList.contains('star')){
  this.addToFavorites(Number(target.textContent));

  target.classList.remove('star')
}
}
}






