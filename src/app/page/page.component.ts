import { Component } from '@angular/core';
import {  DETAILED,} from '../../mocks';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-page',
  standalone: true,
  imports: [],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {
  Alljobsdata =[DETAILED]
  jobdata: any;
  jobId: any;
  industries: any;
  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.jobId = params['id'].toString();
      console.log(this.jobId); // Log the favouriteId to the console
    });
    const index = Number(this.jobId);
    const data =  this.Alljobsdata[0];;
    // Filter data from this.Alljobsdata using the index
   this.jobdata = (data as Record<number, any>)[index];;
   this.industries = this.jobdata.industries;
  }

  generateChips() {
    let chipsHTML = '';
  this.industries.forEach((industry: any) => {
    chipsHTML += `<div class="chip">${industry}</div>`;
  });
  return chipsHTML;
  }
navigateToJobs(type: string) {
  this.router.navigate(['/'+type]);
}
}