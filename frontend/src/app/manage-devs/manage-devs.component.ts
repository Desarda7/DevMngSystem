import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Developer } from 'src/models/developer.model';
import { DeveloperServiceService } from 'src/services/developer-service.service';
import { EditDeveloperDialogComponent } from '../edit-developer-dialog/edit-developer-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-devs',
  templateUrl: './manage-devs.component.html',
  styleUrls: ['./manage-devs.component.scss'],
})
export class ManageDevsComponent {
  // developers: Developer[] = [];
  // dataSource!: MatTableDataSource<Developer>;
  // displayedColumns: string[] = [
  //   'emer',
  //   'mbiemer',
  //   'email',
  //   'experienceLevel',
  //   'skills',
  //   'actions',
  // ];

  // @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  // constructor(private developerService: DeveloperServiceService) {}

  // ngOnInit(): void {
  //   this.loadDevelopers();
  // }

  // loadDevelopers() {
  //   this.developerService.getDevelopers().subscribe((developers) => {
  //     this.developers = developers;
  //     this.dataSource = new MatTableDataSource(this.developers);
  //     this.dataSource.paginator = this.paginator;
  //   });
  // }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value
  //     .trim()
  //     .toLowerCase();
  //   this.dataSource.filter = filterValue;
  // }
  developers: Developer[] = [];
  dataSource!: MatTableDataSource<Developer>;
  displayedColumns: string[] = [
    'emer',
    'mbiemer',
    'email',
    'experienceLevel',
    'skills',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private developerService: DeveloperServiceService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDevelopers();
  }

  loadDevelopers() {
    this.developerService.getAllDevelopers().subscribe((developers) => {
      this.developers = developers;
      this.dataSource = new MatTableDataSource(this.developers);
      this.dataSource.paginator = this.paginator;
      this.cdr.detectChanges(); // Detect changes to ensure data binding updates
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openEditDialog(developer: Developer): void {
    const dialogRef = this.dialog.open(EditDeveloperDialogComponent, {
      width: '500px',
      data: developer,
    });

    dialogRef.afterClosed().subscribe((updatedDeveloper) => {
      if (updatedDeveloper) {
        console.log('Updated developer:', updatedDeveloper);
      }
    });
  }

  deleteDeveloper(developer: Developer): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: `Are you sure you want to delete developer ${developer.name} ${developer.surname}?`,
    };

    const dialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.developerService.deleteDeveloper(developer).subscribe(() => {
          this.developers = this.developers.filter(
            (d) => d.id !== developer.id
          );
          this.dataSource.data = this.developers;
        });
      }
    });
  }
  navigateToHome() {
    this.router.navigate(['/admin']);
  }
}
