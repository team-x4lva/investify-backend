import { PortfolioEntity } from "src/portfolios/entities/portfolio.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "users"
})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => PortfolioEntity, (portfolio) => portfolio.user)
    portfolios: PortfolioEntity[];
}
