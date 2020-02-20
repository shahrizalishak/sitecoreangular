import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({
    providedIn: 'root',
})

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const tasks = [
            {id:1, title: 'Task 1', description: 'Detail task 1', reminder: '2020-01-20', due: '2020-02-15', category: 'Bil'},
            {id:2, title: 'Task 2', description: 'Detail task 2', reminder: '2020-01-22', due: '2020-02-20', category: 'Loan'},
            {id:3, title: 'Task 3', description: 'Detail task 3', reminder: '2020-01-23', due: '2020-02-21', category: 'Personal'},

        ];
        return {tasks};
    }

    genId(tasks: Task[]): number {
        return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1: 11;
    }
}