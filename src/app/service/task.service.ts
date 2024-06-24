import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  httpClient = inject(HttpClient);

  constructor() { }

  addTask(task: string, type: string, start: string, end: string) {
    return this.httpClient.post("http://localhost:3000/AllTask", {
      title: task,
      type: type,
      start: start,
      end: end
    });
  }

 

  completed(task: string, type: string, start: string, end: string) {
    return this.httpClient.post("http://localhost:3000/complete", {
      title: task,
      type: type,
      start: start,
      end: end
    });
  }

  getAllTask() {
    return this.httpClient.get("http://localhost:3000/AllTask");
  }
  getAllComplete() {
    return this.httpClient.get("http://localhost:3000/complete");
  }
  

 

  deleteTask(id: string) {
    return this.httpClient.delete(`http://localhost:3000/complete/${id}`);
  }
  deleteAllTask(id: string) {
    return this.httpClient.delete(`http://localhost:3000/AllTask/${id}`);
  }
  
}
