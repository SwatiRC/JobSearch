import { Component ,ViewEncapsulation} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {  DETAILED,ALL_JOBS} from '../mocks';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'ng-job-search';
  jobs= ALL_JOBS;
  activeTab: string = 'Jobs'; // Initialize active tab
  favoriteJobs: any[] = [];
  jobCardsHTML!: string;
  favid: any;
  Alljobsdata =[DETAILED]
  jobdata: any= []
  pageflag:boolean = false;

  openTab(tabName: string) {
    this.activeTab = tabName;
    this.pageflag =false;

  }
  generateJobCards(): string {
    let jobCardsHTML = '';
    for (const job of this.jobs) {
      const jobId = job.id;
      jobCardsHTML += `
        <div class="job-card">
          <img class="company-logo" src="${job.companyLogo}" alt="Company Logo">
          <div class="job-details">
            <p class="title ${jobId}">${job.title}</p>
            <p class="info">
              <span class="reference">Company: ${job.companyName}</span>
              <span class="location">Reference: ${job.reference}</span>
            </p>
          </div>
          <span class="icon-star"  style="color: yellow; cursor: pointer;">${jobId}</span>
        </div>
      `;
    
    }
    return jobCardsHTML;
  }

  addToFavorites(jobId: any) {
    let job: any;
    // Find the job with the given jobId
    const favJob = this.jobs.find(job => job.id === jobId);
    if (favJob) {
      if (this.favoriteJobs.includes(favJob)) {
        // If the job is already in favoriteJobs, remove it
        this.favid = jobId
        this.favoriteJobs = this.favoriteJobs.filter(job => job.id !== jobId);
      } else {
        // If the job is not in favoriteJobs, add it
        this.favoriteJobs.push(favJob);
      }
      // Update the jobCardsHTML
      this.updateJobCardsHTML();
    }
  }

  updateJobCardsHTML() {
    // Clear the jobCardsHTML
    this.jobCardsHTML = '';
    // Loop through the favoriteJobs and generate HTML for each job
    for (const job of this.favoriteJobs) {
      const jobId = job.id;
      this.jobCardsHTML += `
        <div class="job-card">
          <img class="company-logo" src="${job.companyLogo}" alt="Company Logo">
          <div class="job-details">
            <p class="title">${job.title}</p>
            <p class="info">
              <span class="reference">Company: ${job.companyName}</span>
              <span class="location">Reference: ${job.reference}</span>
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
  
    // Convert otherClasses[0] to a number
    const index = Number(otherClasses[0]);
    const data =  this.Alljobsdata[0];;
    // Filter data from this.Alljobsdata using the index
   this.jobdata = (data as Record<number, any>)[index];;
   this.pageflag =true;
  
    // Now filteredData contains the data matching the index
   
  }

  if (target.classList.contains('icon-star') && !target.classList.contains('star')) {
    // Icon-star element clicked, perform your actions here
    this.addToFavorites(Number(target.textContent)); 
    target.classList.add("star")
    this.pageflag =false;
  }else if(target.classList.contains('star')){
    this.addToFavorites(Number(target.textContent)); 
    this.pageflag =false;
    target.classList.remove('star')
  }
  
}

}



