import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    const LS = JSON.parse(window.localStorage.getItem('todos'));
    if (LS) {
      this.setState({ todos: LS });
    }
  }

  componentDidUpdate() {
    window.localStorage.setItem('todos', JSON.stringify(this.state.todos));
  }

  onSubmit = text => {
    const todo = { text, id: nanoid() };
    this.setState(prevState => ({ todos: [...prevState.todos, todo] }));
  };

  onDelete = id => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };
  render() {
    const { todos } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.onSubmit} />
        <Grid>
          {todos.map((todo, index) => (
            <GridItem key={todo.id}>
              <Todo
                text={todo.text}
                number={index + 1}
                id={todo.id}
                onDelete={this.onDelete}
              />
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}
