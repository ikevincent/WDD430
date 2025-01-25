import { Component, OnInit } from '@angular/core';
import { Contact } from '../contacts.model';

@Component({
  selector: 'cms-contact-list',
  standalone: false,

  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [
    new Contact(
      1,
      'R. Kent Jackson',
      'jacksonk@byui.edu',
      '208-496-3771',
      '../../assets/images/jacksonk.jpg',
      null
    ),
    new Contact(
      2,
      'Rex Barzee',
      'barzeer@byui.edu',
      '208-496-3768',
      '../../assets/images/barzeer.jpg',
      null
    ),
  ];

  constructor() {}

  ngOnInit() {}
}

// import { Recipe } from '../recipe.model';

// export class RecipeListComponent implements OnInit {
//   recipes: Recipe[] = [
//     new Recipe(
//       'Lasagna',
//       'Lasagna is my favorite meal!',
//       'https://cookingwithayeh.com/wp-content/uploads/2023/12/Spinach-Lasagna-SQ-12.jpg'
//     ),
//   ];
