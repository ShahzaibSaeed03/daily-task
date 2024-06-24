import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TaskService } from '../../service/task.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-completed',
  standalone:true,
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css'],
  imports: [CommonModule, HttpClientModule, RouterLink, FormsModule], // Add FormsModule to imports
  providers: [
    DatePipe,
    // other services
  ],
})
export class CompletedComponent implements OnInit {
  currentDate: string;
  TaskList: any[] = [];
  showWriteText: boolean = false;
  newTask: string = '';
  SelectType: string = '';
  Starttime: string = '';
  EndTime: string = '';

  constructor(private datePipe: DatePipe, private httpService: TaskService) {
    const today = new Date();
    this.currentDate = this.datePipe.transform(today, "yyyy-MM-dd 'at' hh:mm a") || '';
  }

  ngOnInit() {
    this.getAllCompleteTasks();
  }

  getAllCompleteTasks() {
    this.httpService.getAllComplete().subscribe(
      (result: any) => {
        this.TaskList = result;
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  deleteTask(id: string) {
    console.log('Deleting task with id:', id); // Check the ID being passed
    this.httpService.deleteTask(id).subscribe(
      (_response) => {
        this.TaskList = this.TaskList.filter((item) => item.id !== id);
      },
      (error) => {
        console.error('Error deleting task:', error);
      }
    );
  }
  
  resetFields() {
    this.newTask = '';
    this.SelectType = '';
    this.Starttime = '';
    this.EndTime = '';
  }

  toggleWriteText() {
    this.showWriteText = !this.showWriteText;
  }
}
