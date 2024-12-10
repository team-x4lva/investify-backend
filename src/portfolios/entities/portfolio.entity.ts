import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @Column("text", { array: true })
    securitiesTickers: string[];
}
