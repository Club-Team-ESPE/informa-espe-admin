import { GetAllDocumentUseCase } from "../../../app/get-all-document.app";
import { DocumentRepository } from "../../../domain/document.repository";
import { DocumentNgHttpRepository } from "../../repository/document-nghttp.repository";

const getAllDocumentUseCaseFactory = (repo: DocumentRepository) =>
  new GetAllDocumentUseCase(repo);

export const getAllDocumentUseCaseProvider = [
  {

    provide: GetAllDocumentUseCase,
    useFactory: getAllDocumentUseCaseFactory,
    deps: [DocumentRepository]
  },
  {
    provide: DocumentRepository,
    useClass: DocumentNgHttpRepository
  }
];