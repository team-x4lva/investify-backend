import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { SecurityCategories } from "../enums/security-categories.enum";

@Entity({
    name: "securities"
})
export class SecurityEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    ticker: string;

    @Column({
        type: "enum",
        enum: SecurityCategories
    })
    category: SecurityCategories;

    @Column()
    isProfitable: boolean;

    @Column()
    volatility: number;
}
