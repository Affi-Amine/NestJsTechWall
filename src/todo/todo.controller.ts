import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { Todo } from './entities/todo.entity';

@Controller('todo')
export class TodoController {
  constructor() {
    this.todos = [];
  }

  todos: Todo[];

  @Get()
  getTodos(
    @Query() myQueriesParams
  ) {
    console.log(myQueriesParams)
    return this.todos;
  }

  @Get(':id')
  getTodoById(
    @Param('id') id //This id is type string
  ) {
    const todo = this.todos.find((actualTodo:Todo) => actualTodo.id === +id) //do we add + to make it an int 
    if(todo)
      return todo;
    else
      throw new NotFoundException(`Le todo d'id ${id} n'est pas trouvé`);
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
