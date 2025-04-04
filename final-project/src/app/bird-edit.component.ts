import { Component } from '@angular/core';
import { BirdService } from './bird.service';
import { Bird } from './bird.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bird-edit',
  standalone: false,
  templateUrl: './bird-edit.component.html',
  styleUrls: ['./bird-edit.component.css'],
})
export class BirdEditComponent {
  bird: Bird = {
    name: '',
    description: '',
    dateSeen: new Date(),
    locationSeen: '',
    imageUrl: '',
  };

  isEditMode = false;
  birdId: string | null = null;

  constructor(
    private birdService: BirdService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.birdId = this.route.snapshot.paramMap.get('id');
    if (this.birdId) {
      this.isEditMode = true;
      this.birdService.getBirdById(this.birdId).subscribe((bird) => {
        this.bird = bird;
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.birdId) {
      this.birdService.updateBird(this.birdId, this.bird).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.birdService.addBird(this.bird).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { BirdService } from './bird.service';
// import { Bird } from './bird.model';
// import { FormBuilder, FormGroup } from '@angular/forms';

// @Component({
//   selector: 'app-bird-edit',
//   standalone: false,
//   templateUrl: './bird-edit.component.html',
//   styleUrls: ['./bird-edit.component.css'],
// })
// export class BirdEditComponent implements OnInit {
//   birdForm: FormGroup;
//   bird: Bird;

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private birdService: BirdService,
//     private fb: FormBuilder
//   ) {
//     this.birdForm = this.fb.group({
//       name: [''],
//       description: [''],
//       dateSeen: [''],
//       locationSeen: [''],
//       imageUrl: [''],
//     });
//   }

//   ngOnInit(): void {
//     const birdId = this.route.snapshot.paramMap.get('id');
//     if (birdId) {
//       this.birdService.getBird(birdId).subscribe((data) => {
//         this.bird = data;
//         this.birdForm.patchValue({
//           name: this.bird.name,
//           description: this.bird.description,
//           dateSeen: this.bird.dateSeen,
//           locationSeen: this.bird.locationSeen,
//           imageUrl: this.bird.imageUrl,
//         });
//       });
//     }
//   }

//   get isEditMode(): boolean {
//     return !!this.route.snapshot.paramMap.get('id');
//   }

//   saveBird(): void {
//     if (this.birdForm.valid) {
//       const updatedBird = { ...this.bird, ...this.birdForm.value };
//       this.birdService.updateBird(updatedBird).subscribe(() => {
//         // Handle successful update, e.g., navigate back to the bird list
//         this.router.navigate(['/birds']);
//       });
//     }
//   }

//   addBird(): void {
//     if (this.birdForm.valid) {
//       this.birdService.addBird(this.birdForm.value).subscribe(() => {
//         // Reset form after submission
//         this.birdForm.reset();
//         this.router.navigate(['/birds']);
//       });
//     }
//   }
// }
