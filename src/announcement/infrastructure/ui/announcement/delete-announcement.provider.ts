

import { DeleteAnnouncementUseCase } from "../../../app/delete-announcement-use-case";
import { AnnouncementRepository } from "../../../domain/announcement.repository";
import { AnnouncementNgHttpRepository } from "../../repository/announcement-nghttp.repository";


const DeleteAnnouncementUseCaseFactory = (repo: AnnouncementRepository) =>
  new DeleteAnnouncementUseCase(repo);

export const deleteAnnouncementUseCaseProvider = [
  {

    provide: DeleteAnnouncementUseCase,
    useFactory: DeleteAnnouncementUseCaseFactory,
    deps: [AnnouncementRepository]
  },
  {
    provide: AnnouncementRepository,
    useClass: AnnouncementNgHttpRepository
  }
];