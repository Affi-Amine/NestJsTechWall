import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { Todo } from './entities/todo.entity';

@Controller('todo')
export class TodoController {
  constructor() {
    this.todos = [];
  }

  todos: Todo[];

  @Get()
  getTodos() {
    return this.todos;
  }

  @Post()
  addTodo(@Body() newTodo: Todo) {
    if (this.todos.length) {
      newTodo.id = Number(this.todos[this.todos.length - 1].id) + 1;
    } else {
      newTodo.id = 1;
    }
    this.todos.push(newTodo);
    return newTodo;
  }

  @Delete()
  deleteTodo() {
    console.log('supprimer un Todo de liste des Todos');
    return 'SUPPRIMER TODO';
  }

  @Put()
  modifierTodo() {
    console.log('modifier un Todo de liste des Todos');
    return 'MODIFIER TODO';
  }
}
