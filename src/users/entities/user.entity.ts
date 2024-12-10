import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn
} from "typeorm";

@Entity({
    name: "users"
})
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;
}
