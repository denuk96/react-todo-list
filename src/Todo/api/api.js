import React from "react";
import ToDoItemModel from "../ToDoItemModel";

class TodoApi {
  static getAll() {
    let request = new XMLHttpRequest();
    let todos = new Array()
    request.open('GET', 'http://localhost:3000/todo_items',false);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
          let response = JSON.parse(this.response)

          response.map(todo => {
            todos.push(new ToDoItemModel(todo.id, todo.title, todo.completed))
          })
        } else {
            console.log(this.status)
        }
    };
    request.onerror = function() {
        console.log('error')
    };
    request.send();

    return todos
  }
}

export default TodoApi