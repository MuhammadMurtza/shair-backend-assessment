import { Get, Delete , JsonController, Param, Body , Post, Patch } from "routing-controllers";
import { State } from "../../models";
import { getRepository, Repository } from "typeorm";


interface Params {
  value : string,
  label : string,
}


@JsonController()
export class StatesController {
  stateRepository: Repository<State>;

  constructor() {
    this.stateRepository = getRepository(State);
  }

  @Post("/states")
  post(@Body() stateParams: Params) {
    return this.stateRepository.insert(stateParams);
  }

  @Get("/states")
  getAll() {
    return this.stateRepository.find();
  }

  @Get("/states/:id")
  getOne(@Param("id") id: number) {
    return this.stateRepository.findOne(id);
  }

  @Patch("/states/:id")
  patch(@Param("id") id: number, @Body() updateParams: Params) {
    return this.stateRepository.update(id, updateParams);
  }

  @Delete("/states/:id")
  remove(@Param("id") id: number) {
    return this.stateRepository.delete(id);
  }
}
