import * as dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { Get, Delete , JsonController, Param, Body , Post, Patch, BadRequestError, NotFoundError } from "routing-controllers";
import { Registration, State, Car, Color } from "../../models";
import { getRepository, Repository } from "typeorm";
import { validate } from "class-validator";

interface RegistrationParams {
    license_plate_number : string,
    registration_number : string,
    name_on_registration : string,
    state_of_registration: string,
    car_details : {
        vin_number : string,
        value_of_vehicle : number,
        milage_of_vehicle: number,
        description: string,
        color_of_vehicle: string
    }
}

interface UpdateParams {
  license_plate_number : string,
  registration_number : string,
  name_on_registration : string
}

@JsonController()
export class RegistrationController {
  registrationRepository: Repository<Registration>;

  constructor() {
    this.registrationRepository = getRepository(Registration);
  }

  @Post("/registrations")
  async post(@Body() registrationParams: RegistrationParams) {

    const {license_plate_number, registration_number, name_on_registration, state_of_registration, car_details } = registrationParams;

    const stateData = await getRepository(State).findOne({where: {value: state_of_registration}});
    const colorData = await getRepository(Color).findOne({where: {value: car_details.color_of_vehicle}});
    const vinData = await axios.get(process.env.VIN_DECODER_API_URL + car_details.vin_number + "?format=json");

    const { ErrorCode, ErrorText, Make, Model, ModelYear } = vinData.data.Results[0];

    if(!stateData) {
      return new NotFoundError("Invalid state - Provided state does not exist in the system");
    }
    if(!colorData) {
      return new NotFoundError("Invalid color - Provided color does not exist in the system");
    }
    if(ErrorCode !== "0"){
      return new NotFoundError(ErrorText);
    }

    const state = new State();
    state.id = stateData.id;
    state.value = stateData.value;
    state.label = stateData.label;



    const registration = new Registration();
    registration.license_plate_number = license_plate_number;
    registration.registration_number = registration_number;
    registration.name_on_registration = name_on_registration;
    registration.state_of_registration = state;

    const {vin_number, value_of_vehicle: value_of_vehicle, milage_of_vehicle: milage_of_vehicle, description} = car_details;

    const car_color = new Color();
    car_color.value = colorData.value;
    car_color.label = colorData.label;

    const car = new Car();
    car.vin_number = vin_number;
    car.value_of_vehicle = value_of_vehicle;
    car.milage_of_vehicle = milage_of_vehicle;
    car.description = description;
    car.vehicle_make = Make;
    car.vehicle_model = Model;
    car.vehicle_year = ModelYear;
    car.color_of_vehicle = car_color;

    registration.car_on_registration = car;

    const errors = await validate(registration);
    if (errors.length > 0) {
      const errorsCombined = errors.map((error) => Object.keys(error.constraints).map((key) => error.constraints[key])).join(" ");
      return new BadRequestError(errorsCombined);
    } else {
      return this.registrationRepository.save(registration);
    }
  }


  @Get("/registrations")
  getAll() {
    return this.registrationRepository.find({relations: ["car_on_registration", "state_of_registration"]});
  }

  @Get("/registrations/:id")
  getOne(@Param("id") id: number) {
    return this.registrationRepository.findOne(id, {relations: ["car_on_registration", "state_of_registration"]});
  }

  @Patch("/registrations/:id")
  patch(@Param("id") id: number, @Body({required: true}) updateParams: UpdateParams) {
    return this.registrationRepository.update(id, updateParams);
  }

  @Delete("/registrations/:id")
  remove(@Param("id") id: number) {
    return this.registrationRepository.delete(id);
  }
}
