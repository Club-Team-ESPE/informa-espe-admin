import { UpdateAnnouncementUseCase } from "../../../app/update-announcement-use-case";
import { AnnouncementRepository } from "../../../domain/announcement.repository";
import { AnnouncementNgHttpRepository } from "../../repository/announcement-nghttp.repository";



const updateAnnouncementUseCaseFactory = (repo: AnnouncementRepository) =>
  new UpdateAnnouncementUseCase(repo);

export const updateAnnouncementUseCaseProvider = [
  {

    provide: UpdateAnnouncementUseCase,
    useFactory: updateAnnouncementUseCaseFactory,
    deps: [AnnouncementRepository]
  },
  {
    provide: AnnouncementRepository,
    useClass: AnnouncementNgHttpRepository
  }
];