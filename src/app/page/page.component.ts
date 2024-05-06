import { Component } from '@angular/core';
import { DETAILED } from '../../mocks';
import { ActivatedRoute, Router } from '@angular/router';

// Define interfaces for job data
interface Job {
  id: number;
  companyName: string;
  title: string;
  companyLogo: string;
  reference: string;
  location: string;
  industries: string[];
  types: string[];
  description: string;
  publishDate: string;
}

interface AllJobsData {
  jobs: { [key: string]: Job };
}

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent {
  // Declare Alljobsdata as AllJobsData
  Alljobsdata: AllJobsData = {
    jobs: DETAILED // Assuming DETAILED is an object with job IDs as keys
  };

  data: Job | undefined;

  jobId: string = "";

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.jobId = params['id'].toString();
      const index = Number(this.jobId);
      // Access the job object using the job ID as the key
      this.data = this.Alljobsdata.jobs[index];
    });
  }

  generateChips() {
    let chipsHTML = '';
    if (this.data && this.data.industries) {
      this.data.industries.forEach(industry => {
        chipsHTML += `<div class="chip">${industry}</div>`;
      });
    }
    return chipsHTML;
  }

  navigateToJobs(type: string) {
    this.router.navigate(['/' + type]);
  }
}
