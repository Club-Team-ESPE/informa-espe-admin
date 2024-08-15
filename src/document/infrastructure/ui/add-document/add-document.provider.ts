
import { AddDocumentUseCase } from "../../../app/add-document.app";
import { DocumentRepository } from "../../../domain/document.repository";
import { DocumentNgHttpRepository } from "../../repository/document-nghttp.repository";


const addDocumentUseCaseFactory = (repo: DocumentRepository) =>
  new AddDocumentUseCase(repo);

export const addDocumentUseCaseProvider = [
  {

    provide: AddDocumentUseCase,
    useFactory: addDocumentUseCaseFactory,
    deps: [DocumentRepository]
  },
  {
    provide: DocumentRepository,
    useClass: DocumentNgHttpRepository
  }
];