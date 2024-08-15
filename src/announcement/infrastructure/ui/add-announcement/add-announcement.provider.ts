import { AddAnnouncementUseCase } from "../../../app/add-announcement-use-case";
import { AnnouncementRepository } from "../../../domain/announcement.repository";
import { AnnouncementNgHttpRepository } from "../../repository/announcement-nghttp.repository";



const addAnnouncementUseCaseFactory = (repo: AnnouncementRepository) =>
  new AddAnnouncementUseCase(repo);

export const addAnnouncementUseCaseProvider = [
  {

    provide: AddAnnouncementUseCase,
    useFactory: addAnnouncementUseCaseFactory,
    deps: [AnnouncementRepository]
  },
  {
    provide: AnnouncementRepository,
    useClass: AnnouncementNgHttpRepository
  }
];