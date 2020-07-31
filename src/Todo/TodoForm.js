import React from "react";

class TodoForm extends React.Component {
    getString(props) {
       let text = document.getElementById('todoForm').value
       if (props.new === true) {
         props.addTodos(text)
       } else {
         props.updateTodo(props.todoItemId, text)
       }
    }

    render() {
        return (
            <div>
               <label>
                  New TODO
                  <input type="text" name="todo" id='todoForm'/>
                  </label>
                  <input type="submit" value="Save" className='btn btn-info' onClick={this.getString.bind(null, this.props)}/>
            </div>
        );
    }
}

export default TodoForm