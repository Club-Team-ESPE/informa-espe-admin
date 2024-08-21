import { New } from "./new.entity";

export abstract class NewRepository{
  abstract add(entity:FormData) : Promise<void>;
  abstract update(entity:FormData, id:number) : Promise<void>;
  abstract getAll(): Promise<New[]>;
  abstract getById(id:number): Promise<New>;
  abstract delete(id: number): Promise<void>;

}