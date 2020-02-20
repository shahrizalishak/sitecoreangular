import { Component, OnInit } from '@angular/core';
import { FeedServiceService } from './feed-service.service';
import { error } from 'protractor';


import 'rxjs/operators';
import { Task } from './task';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // private feedUrl: string = 'https://www.becompany.ch/en/blog/feed.xml';
  private feedUrl: string = 'http://www.hmetro.com.my/utama.xml';
  private feeds: any;

  tasks: Task[] = [];

  constructor(
    private feedService: FeedServiceService,
    private taskService: TaskService
  ){}

  ngOnInit(){
    this.refreshFeed();
    this.getTasks();
  }

  private refreshFeed(){
    this.feedService.getFeedContent(this.feedUrl)
        .subscribe(
            feed => {console.log(feed)});
  }

  getTasks() {
    this.taskService.getTasks()
    .subscribe(tasks => this.tasks = tasks);
  }
}
