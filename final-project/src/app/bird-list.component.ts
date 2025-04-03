import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BirdService } from './bird.service';
import { Bird } from './bird.model';

@Component({
  selector: 'app-bird-list',
  standalone: false,
  templateUrl: './bird-list.component.html',
  styleUrls: ['./bird-list.component.css'],
})
export class BirdListComponent implements OnInit {
  birds: Bird[] = [];
  selectedBird: Bird | null = null;

  constructor(private birdService: BirdService, private router: Router) {}

  ngOnInit(): void {
    this.loadBirds();
  }

  loadBirds(): void {
    this.birdService.getBirds().subscribe((data) => {
      this.birds = data;
    });
  }

  navigateToAddBird(): void {
    this.router.navigate(['/add-bird']);
  }

  selectBird(bird: Bird): void {
    this.selectedBird = bird;
  }

  deleteBird(birdId: string): void {
    this.birdService.deleteBird(birdId).subscribe({
      next: () => {
        this.loadBirds(); // Reload the bird list after deletion
        this.selectedBird = null; // Clear the selected bird
      },
      error: (err) => {
        console.error('Error deleting bird:', err);
        alert('Failed to delete bird. Please try again.');
      },
    });
  }
}
