import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'profiles' })
export class Profile {
  @ApiProperty({ readOnly: true })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255, name: 'last_name' })
  lastName!: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 300, nullable: true })
  avatar!: string;

  @ApiProperty({ readOnly: true })
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt!: Date;

  @ApiProperty({ readOnly: true })
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
  updatedAt!: Date;
}
