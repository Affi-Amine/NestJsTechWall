import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { addTodoDto } from './dto/add-todo.dto';
import { GetPaginatedTodoDto } from './dto/get-paginated-todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(
    private todoService: TodoService //this is how we do dependency injection in nestjs
  ) {}

  @Get()
  getTodos(
    @Query() myQueriesParams: GetPaginatedTodoDto
  ) 
  {
    console.log(myQueriesParams)
    return this.todoService.getTodos();
  }

  @Get(':id')
  getTodoById(
    @Param('id') id //This id is type string
  ) 
  {
      return this.todoService.getTodoById(+id);
  }

  @Post()
  addTodo(@Body() newTodo: addTodoDto) : Todo{
    return this.todoService.addTodo(newTodo);
  }

  //delete un todo via son id
  @Delete(':id')
  deleteTodo(
    @Param('id') id
  ) 
  {
    return this.todoService.deleteTodo(+id);
  }

  @Put(':id')
  modifierTodo(
    @Param('id') id,
    @Body() newTodo: Partial<addTodoDto>
  ) 
  {
    return this.todoService.updateTodo(+id, newTodo);
  }
}
