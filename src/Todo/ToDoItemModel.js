import React from "react";

class ToDoItemModel {
    constructor(title) {
        this.title = title
        this.completed = false
        this.id = this.save()
    }

    save() {
        alert('save on backend imitation')
        return Math.floor(Math.random() * 1000000000);
    }
}

export default ToDoItemModel