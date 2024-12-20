import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { SecurityCategories } from "../enums/security-categories.enum";

@Entity({
    name: "securities"
})
export class SecurityEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    ticker: string;

    @Column()
    name: string;

    @Column({
        type: "enum",
        enum: SecurityCategories
    })
    category: SecurityCategories;

    @Column({
        name: "is_profitable"
    })
    isProfitable: boolean;

    @Column({
        type: "decimal",
        precision: 4,
        scale: 3,
        nullable: true
    })
    volatility: number;
}
