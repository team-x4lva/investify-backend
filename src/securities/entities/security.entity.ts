import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column()
    volatility: number;
}
