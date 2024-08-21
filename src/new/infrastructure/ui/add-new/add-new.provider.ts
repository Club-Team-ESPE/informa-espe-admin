
import { AddNewUseCase } from "../../../app/add-new.app";
import { NewRepository } from "../../../domain/new.repository";
import { NewNgHttpRepository } from "../../repository/new-nghttp.repository";


const addNewUseCaseFactory = (repo: NewRepository) =>
  new AddNewUseCase(repo);

export const addNewUseCaseProvider = [
  {

    provide: AddNewUseCase,
    useFactory: addNewUseCaseFactory,
    deps: [NewRepository]
  },
  {
    provide: NewRepository,
    useClass: NewNgHttpRepository
  }
];