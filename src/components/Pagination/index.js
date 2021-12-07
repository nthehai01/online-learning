import React from "react";
import { ReactDOM } from "react";
import "./index.css";
export default class Pagination extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      todosPerPage: 6,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    console.log(event.target.id);
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  render() {
    const todos = this.props.data;
    const { currentPage, todosPerPage } = this.state;
    // Logic for displaying todos
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

    const renderTodos = currentTodos.map((todo, index) => {
      return <>{todo}</>;
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => {
      return (
        <li
          class={number === currentPage ? "page-item active" : "page-item"}
          key={number}
          onClick={this.handleClick}
        >
          <div class="page-link" id={number}>
            {number}
          </div>
        </li>
      );
    });

    return (
      <>
        <div>{renderTodos} </div>
        <div class="clrfloat"></div>
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">{renderPageNumbers}</ul>
        </nav>
      </>
    );
  }
}
