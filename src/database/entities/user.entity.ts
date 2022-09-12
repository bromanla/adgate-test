import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('bigint', { unique: true })
  userId: number;

  @Column('boolean', { default: true })
  enable: boolean;
}
