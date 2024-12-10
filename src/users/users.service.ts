import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { FindOptionsWhere, Repository } from "typeorm";
import { PortfoliosService } from "src/portfolios/portfolios.service";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly portfoliosService: PortfoliosService
    ) {}

    async create(user: CreateUserDto) {
        this.userRepository.create(user);
        return await this.userRepository.save(user);
    }

    async findAll() {
        return await this.userRepository.find();
    }

    async findOne(
        where: FindOptionsWhere<UserEntity>,
        selectPassword: boolean = false
    ) {
        const queryBuilder = this.userRepository
            .createQueryBuilder("user")
            .where(where);

        if (selectPassword) {
            queryBuilder.addSelect("user.password");
        }

        return await queryBuilder.getOne();
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        return await this.userRepository.update(id, updateUserDto);
    }

    async remove(id: number) {
        return await this.userRepository.delete(id);
    }

    async findPortfolios(userId: number) {
        return await this.portfoliosService.findByUserId(userId);
    }
}
