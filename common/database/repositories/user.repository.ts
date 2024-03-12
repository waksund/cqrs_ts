import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "../entities";
import {v4} from "uuid";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
    }

    async findByEmail(email: string): Promise<User | null>{
        return await this.userRepository.findOneBy({email: email});
    }

    async insert(user: Partial<User>): Promise<void>{
        await this.userRepository.insert(user);
        return void 0;
    }
}
