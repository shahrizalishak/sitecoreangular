import { Component, OnInit } from '@angular/core';
import { FeedServiceService } from './../feed-service.service';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-rss',
  templateUrl: './rss.component.html',
  styleUrls: ['./rss.component.css']
})
export class RssComponent implements OnInit {

  // private feedUrl: string = 'https://www.hmetro.com.my/utama.xml';
  feeds: any;

  tasks: Task[] = [];

  constructor(
    private feedService: FeedServiceService,
    private taskService: TaskService
  ){}

  ngOnInit(){
    // this.refreshFeed();
    this.getTask();
  }

  private refreshFeed(){
    // this.feedService.getFeedContent(this.feedUrl)
    //     .subscribe(
    //         feed => this.feeds = feed.items);
  }

  getTask(){
    this.taskService.getTasks()
    .subscribe(tasks => this.tasks = tasks);
  }
}
