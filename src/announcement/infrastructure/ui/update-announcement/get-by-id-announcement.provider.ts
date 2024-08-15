
import { GetByIdAnnouncementUseCase } from "../../../app/get-by-id-announcement-use-case";
import { AnnouncementRepository } from "../../../domain/announcement.repository";
import { AnnouncementNgHttpRepository } from "../../repository/announcement-nghttp.repository";


const getByIdAnnouncementUseCaseFactory = (repo: AnnouncementRepository) =>
  new GetByIdAnnouncementUseCase(repo);

export const getByIdAnnouncementUseCaseProvider = [
  {

    provide: GetByIdAnnouncementUseCase,
    useFactory: getByIdAnnouncementUseCaseFactory,
    deps: [AnnouncementRepository]
  },
  {
    provide: AnnouncementRepository,
    useClass: AnnouncementNgHttpRepository
  }
];