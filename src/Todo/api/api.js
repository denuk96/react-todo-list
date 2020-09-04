import React from "react";
import ToDoItemModel from "../model/ToDoItemModel";

const request = new XMLHttpRequest();
const url = 'https://young-chamber-53830.herokuapp.com/todo_items/'
const requestHeader = ['Content-Type', 'application/json; charset=utf-8']

class TodoApi {
  static getAll() {
    let todos = new Array()
    request.open('GET', url,false);
    request.setRequestHeader(...requestHeader);
    request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
          let response = JSON.parse(this.response)
          console.log('get todos: ', this.status)
          response.map(todo => {
            todos.push(new ToDoItemModel(todo.id, todo.title, todo.completed))
          })

        } else {
          console.log('get todos: ', this.status)
        }
    };
    request.onerror = function() {
        console.log('get todos: ', 'error')
    };
    request.send();

    return todos
  }

  static save(params) {
      let result = false;
      let formData = JSON.stringify(params)

      request.open('POST', url, false);
      request.setRequestHeader(...requestHeader);

      request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            result = JSON.parse(this.response)
        }
      }

      request.onerror = function () {
          console.log('error')
      };
      request.send(formData);

      return result
  }

  static update(todo) {
    request.open('PUT', url + todo.id, true);
    request.setRequestHeader(...requestHeader);

    let formData = JSON.stringify(todo)
    request.onload = function () {
      console.log(this.status)
    }

    request.onerror = function () {
      console.log('error')
    };

    request.send(formData);
  }

  static delete(id) {
    request.open('DELETE', url + id, true);
    request.setRequestHeader(...requestHeader);

    request.onload = function () {
      if (this.status >= 200 && this.status < 400) {
        console.log("deleted")
      } else {
        console.log(this.status)
      }
    }
    request.onerror = function () {
      console.log('error')
    };

    request.send(null);
  }
}

export default TodoApi