import React from "react";

class ToDoItemModel {
    constructor(id, title, completed) {
        this.id = id
        this.title = title
        this.completed = completed
    }

    save() {
        // let request = new XMLHttpRequest();
        // request.open('POST', 'http://localhost:3000/todo_items');
        // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        //
        // request.onload = function() {
        //     if (this.status >= 200 && this.status < 400) {
        //         // Success!
        //
        //        console.log('yes')
        //
        //         // let data = JSON.parse(this.response);
        //         // console.log(data)
        //     } else {
        //         // We reached our target server, but it returned an error
        //         console.log('no')
        //     }
        // };
        // request.onerror = function() {
        //     console.log('error')
        // };
        // request.send(this);
    }

    delete() {
        console.log('deleted')
    }

    toggleCompleted(){
       this.completed = !this.completed
    }
}


export default ToDoItemModel