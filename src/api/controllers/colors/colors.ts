import { Get, Delete , JsonController, Param, Body , Post, Patch } from "routing-controllers";
import { Color } from "../../models";
import { getRepository, Repository } from "typeorm";

interface Params {
  value : string,
  label : string,
}

@JsonController()
export class ColorsController {
  colorRepository: Repository<Color>;

  constructor() {
    this.colorRepository = getRepository(Color);
  }

  @Post("/colors")
  post(@Body() colorParams: Params) {
    return this.colorRepository.insert(colorParams);
  }

  @Get("/colors")
  getAll() {
    return this.colorRepository.find();
  }

  @Get("/colors/:id")
  getOne(@Param("id") id: number) {
    return this.colorRepository.findOne(id);
  }

  @Patch("/colors/:id")
  patch(@Param("id") id: number, @Body() updateParams: Params) {
    return this.colorRepository.update(id, updateParams);
  }

  @Delete("/colors/:id")
  remove(@Param("id") id: number) {
    return this.colorRepository.delete(id);
  }
}
