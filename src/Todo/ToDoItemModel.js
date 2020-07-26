import React from "react";

class ToDoItemModel {
    constructor(title) {
        this.title = title
        this.completed = false
        this.id = this.save()
    }

    save() {
        return Math.floor(Math.random() * 1000000000);
    }

    delete() {
        console.log('deleted')
    }

    toggleCompleted(){
       this.completed = !this.completed
    }
}

export default ToDoItemModel