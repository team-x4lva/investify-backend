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

    async create(...createSecurityDtos: CreateSecurityDto[]) {
        return await this.securityRepository.save(createSecurityDtos);
    }

    async findAll() {
        return await this.securityRepository.find();
    }

    async findByIds(ids: number[]) {
        return await this.securityRepository.findByIds(ids);
    }

    async isMoexDataAvailable() {
        const amount = await this.securityRepository.count();

        return amount === 0 ? false : true;
    }

    async getProfitable() {
        const entities = await this.securityRepository.find({
            where: {
                isProfitable: true
            }
        });

        return entities.map((entity) => JSON.stringify(entity));
    }

    async findOne(ticker: string) {
        return await this.securityRepository.findOneBy({ ticker });
    }

    async update(id: number, updateSecurityDto: UpdateSecurityDto) {
        return await this.securityRepository.update(id, updateSecurityDto);
    }

    async bulkUpdate(updateSecurityDtos: UpdateSecurityDto[]) {
        return await this.securityRepository.upsert(updateSecurityDtos, [
            "ticker"
        ]);
    }

    async remove(id: number) {
        return await this.securityRepository.delete(id);
    }
}
