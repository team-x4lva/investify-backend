import { SecurityEntity } from "src/securities/entities/security.entity";
import { UserEntity } from "src/users/entities/user.entity";
import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";

@Entity({
    name: "portfolios"
})
export class PortfolioEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    userId: number;

    @ManyToOne(() => UserEntity, (user) => user.portfolios)
    user: UserEntity;

    @ManyToMany(() => SecurityEntity)
    @JoinTable()
    securities: SecurityEntity[];

    @Column("decimal", { precision: 3, scale: 2, array: true })
    share: number[];
}
