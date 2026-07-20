import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Post } from './post.entity';

@Entity({ name: 'categories' })
export class Category {
  @ApiProperty({ readOnly: true })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  name!: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 800, nullable: true })
  description!: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 800, name: 'cover_image', nullable: true })
  coverImage!: string;

  @ApiProperty({ readOnly: true })
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt!: Date;

  @ApiProperty({ readOnly: true })
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
  updatedAt!: Date;

  @ManyToMany(() => Post, (post) => post.categories)
  posts!: Post[];
}
