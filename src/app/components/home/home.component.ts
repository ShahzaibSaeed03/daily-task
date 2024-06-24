import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TaskService } from '../../service/task.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule], // Add FormsModule to imports
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {
  currentDate: string;
  OnlyDate: string;

  showWriteText: boolean = false;
  TaskList: any[] = [];

  newTask: string = '';
  SelectType: string = '';
  StartTime: string = '';
  EndTime: string = '';

  constructor(private datePipe: DatePipe, private httpService: TaskService) {
    const today = new Date();
    this.currentDate = this.datePipe.transform(today, 'yyyy-MM-dd \'at\' hh:mm a') || '';
    this.OnlyDate = this.datePipe.transform(today, 'MMMM-d') || '';
  }

  ngOnInit() {
    this.getAllTask();
  }

  getAllTask() {
    this.httpService.getAllTask().subscribe(
      (result: any) => {
        this.TaskList = result;
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.newTask.trim() !== '' && this.SelectType !== '') {
      this.addTask(this.newTask.trim(), this.SelectType,this.EndTime,this.StartTime);
    }
  }
  addTask(task: string, type: string, start: string, end: string) {
    this.httpService.addTask(task, type, start, end).subscribe(
      (_response) => {
        this.getAllTask();
        this.resetFields();
      },
      (error) => {
        console.error('Error adding task:', error);
      }
    );
  }

  addImportantTask(task: any) {
    this.httpService.completed(task.title, task.type, task.start, task.end).subscribe(
      (_response) => {
        this.deleteTask(task.id);
      },
      (error) => {
        console.error('Error adding important task:', error);
      }
    );
  }

  deleteTask(id: string) {
    this.httpService.deleteAllTask(id).subscribe(
      (_response) => {
        this.TaskList = this.TaskList.filter(item => item.id !== id);
      },
      (error) => {
        console.error('Error deleting task:', error);
      }
    );
  }

  onCheckboxChange(item: any) {
    if (item && item.id) {
      this.addImportantTask(item);
    }
  }

  resetFields() {
    this.newTask = '';
    this.SelectType = '';

    this.StartTime = '';
    this.EndTime = '';
  }

  toggleWriteText() {
    this.showWriteText = !this.showWriteText;
  }
}
