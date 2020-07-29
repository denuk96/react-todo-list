import React from "react";
import ToDoItemModel from "../ToDoItemModel";

const request = new XMLHttpRequest();
const url = 'https://young-chamber-53830.herokuapp.com/todo_items/'
// const url = 'http://localhost:3000/todo_items/'

class TodoApi {
  static getAll() {
    let todos = new Array()
    request.open('GET', url,false);
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

  static save(params) {
      let result = false;
      let formData = JSON.stringify(params)

      request.open('POST', url, false);
      request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

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
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

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
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

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