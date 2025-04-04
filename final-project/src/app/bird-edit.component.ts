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
