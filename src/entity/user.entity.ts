import {Entity,PrimaryGeneratedColumn,Column,JoinColumn,ManyToOne} from "typeorm";
import {Role} from "./role.entity";

@Entity()

export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  phone:string;

  @Column({
    unique: true
  })
  email: string;

  @Column()
  password: string;

  @Column()
  ispublished: boolean;

  @ManyToOne(() => Role)
  @JoinColumn({name: 'role_id'})
  role: Role;

}
