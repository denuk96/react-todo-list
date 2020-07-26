import React from "react";
import ToDoItemModel from "../ToDoItemModel";

class TodoApi {
  static getAll() {
    let request = new XMLHttpRequest();
    let todos = []
    request.open('GET', 'http://localhost:3000/todo_items',true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
          let response = JSON.parse(this.response)

          response.map(function(todo) {
            todos.push(new ToDoItemModel(todo.id, todo.title, todo.completed))
          })
        } else {
            console.log('no')
        }
    };
    request.onerror = function() {
        console.log('error')
    };

    request.send();
    // console.log(todos)
    return todos
  }
}

export default TodoApi