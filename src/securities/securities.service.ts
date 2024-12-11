import { Injectable } from "@nestjs/common";
import { CreateSecurityDto } from "./dto/create-security.dto";
import { UpdateSecurityDto } from "./dto/update-security.dto";
import { Repository } from "typeorm";
import { SecurityEntity } from "./entities/security.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class SecuritiesService {
    constructor(
        @InjectRepository(SecurityEntity)
        private readonly securityRepository: Repository<SecurityEntity>
    ) {}

    async create(createSecurityDto: CreateSecurityDto) {
        return await this.securityRepository.save(createSecurityDto);
    }

    async findAll() {
        return await this.securityRepository.find();
    }

    async findOne(id: number) {
        return await this.securityRepository.findOneBy({ id });
    }

    async update(id: number, updateSecurityDto: UpdateSecurityDto) {
        return await this.securityRepository.update(id, updateSecurityDto);
    }

    async remove(id: number) {
        return await this.securityRepository.delete(id);
    }
}
