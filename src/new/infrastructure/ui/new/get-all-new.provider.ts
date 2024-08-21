
import { GetAllNewUseCase } from "../../../app/get-all-new.app";
import { NewRepository } from "../../../domain/new.repository";
import { NewNgHttpRepository } from "../../repository/new-nghttp.repository";
 

const getAllNewUseCaseFactory = (repo: NewRepository) =>
  new GetAllNewUseCase(repo);

export const getAllNewUseCaseProvider = [
  {

    provide: GetAllNewUseCase,
    useFactory: getAllNewUseCaseFactory,
    deps: [NewRepository]
  },
  {
    provide: NewRepository,
    useClass: NewNgHttpRepository
  }
];