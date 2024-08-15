import { Document } from "../domain/document.entity";

export abstract class DocumentRepository{
  abstract add(entity:Document) : Promise<void>;
  abstract getAll(): Promise<Document[]>;
  abstract getForId(id:number): Promise<Document>;
  abstract delete(id: number): Promise<void>;

}