import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {Feed} from './model/feed';

@Injectable({
  providedIn: 'root'
})
export class FeedServiceService {
  private rssToJsonServiceBaseUrl: string = 'https://rss2json.com/api.json?rss_url=';

  constructor(
    private http: HttpClient
  ) {}

  getFeedContent(url: string): Observable<Feed> {
    let fullUrl: string = this.rssToJsonServiceBaseUrl + url;
    return this.http.get(fullUrl)
    .pipe(map(this.extractFeeds));
  }

  private extractFeeds(res: Response): Feed {
    let feed = res;
    return feed || feed[0];
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
