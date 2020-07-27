import React from "react";
import TodoApi from "./api/api";

class ToDoItemModel {
    constructor(id = null, title, completed = false) {
        this.id = id
        this.title = title
        this.completed = completed
    }

    save() {
        let result = TodoApi.save(this)
        if (result !== false) {
            this.id = result.id
            return true
        } else {
            return false
        }
    }

    delete() {
        console.log('deleted')
    }

    toggleCompleted(){
       this.completed = !this.completed
    }
}


export default ToDoItemModel