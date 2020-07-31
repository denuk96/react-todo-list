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

    hideThis(props) {
      if (props.new === false) {
        props.hideFormAfterSave()
      }
    }


    render() {
        return (
            <div>
               <label>
                  {
                    this.props.new
                    ? 'New TODO'
                    : 'Update todo'
                  }
                  <input type="text" name="todo" id='todoForm'/>
                  </label>
                  <input type="submit" value="Save" className='btn btn-info'
                         onClick={() =>{ this.getString(this.props); this.hideThis(this.props) } }/>
            </div>
        );
    }
}

export default TodoForm