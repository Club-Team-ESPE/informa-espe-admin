import { GetAllAnnouncementUseCase } from "../../../app/get-all-announcement-use-case";
import { AnnouncementRepository } from "../../../domain/announcement.repository";
import { AnnouncementNgHttpRepository } from "../../repository/announcement-nghttp.repository";


const getAllAnnouncementUseCaseFactory = (repo: AnnouncementRepository) =>
  new GetAllAnnouncementUseCase(repo);

export const getAllAnnouncementUseCaseProvider = [
  {

    provide: GetAllAnnouncementUseCase,
    useFactory: getAllAnnouncementUseCaseFactory,
    deps: [AnnouncementRepository]
  },
  {
    provide: AnnouncementRepository,
    useClass: AnnouncementNgHttpRepository
  }
];