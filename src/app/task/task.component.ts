import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks: Task[] = [];
  newTask: Task;

  displayedColumns: string[] = ['title','description','reminder','due','category'];
  dataSource = new MatTableDataSource<Task>(this.tasks);

  // form variable
  taskForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    reminder: new FormControl(''),
    due: new FormControl(''),
    category: new FormControl('')
  });

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.getTasks();
    this.dataSource.paginator = this.paginator;
  }

  getTasks(): void{
    this.taskService.getTasks()
    .subscribe(tasks => this.tasks = tasks);
  }

  onSubmit(){
    this.newTask = this.taskForm.value;

    this.taskService.addTask(this.newTask)
    .subscribe(task => {
      this.tasks.push(task);
      console.log(this.tasks);
    });
  }

}
