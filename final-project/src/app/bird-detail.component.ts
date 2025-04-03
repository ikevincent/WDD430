import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BirdService } from './bird.service';
import { Bird } from './bird.model';
import { BirdListComponent } from './bird-list.component';

@Component({
  selector: 'app-bird-detail',
  standalone: false,
  templateUrl: './bird-detail.component.html',
  styleUrls: ['./bird-detail.component.css'],
})
export class BirdDetailComponent {
  @Input() bird: Bird;

  constructor(
    private birdService: BirdService,
    private router: Router,
    private birdListComponent: BirdListComponent
  ) {}

  editBird(): void {
    if (this.bird && this.bird._id) {
      this.router.navigate(['/edit-bird', this.bird._id]);
    } else {
      console.error('Bird ID is undefined');
    }
  }

  deleteBird(): void {
    if (this.bird && this.bird._id) {
      this.birdService.deleteBird(this.bird._id).subscribe(() => {
        this.router.navigate(['/birds']);
      });
    } else {
      console.error('Bird ID is undefined');
    }
  }

  // deleteBird(): void {
  //   if (this.bird && this.bird._id) {
  //     this.birdService.deleteBird(this.bird._id).subscribe(() => {
  //       // Handle successful deletion, e.g., navigate back to the bird list
  //       this.router.navigate(['/birds']);
  //     });
  //   } else {
  //     console.error('Bird ID is undefined');
  //   }
  // }
}
