import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findOne(email: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { email } });
    }

    async findOneByUsername(username: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { username } });
    }

    async create(userData: Partial<User>): Promise<User> {
        const user = this.usersRepository.create(userData); // This ensures the entity is created correctly
        return this.usersRepository.save(user);
    }
}
