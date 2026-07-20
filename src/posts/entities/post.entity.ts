import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Category } from './category.entity';

@Entity({ name: 'posts' })
export class Post {
  
  @ApiProperty({ readOnly: true })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  content!: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 800, name: 'cover_image', nullable: true })
  coverImage!: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255, nullable: true })
  summary!: string;

  @ApiProperty()
  @Column({ type: 'boolean', default: true, name: 'is_draft' })
  isDraft!: boolean;

  @ApiProperty({ readOnly: true })
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt!: Date;

  @ApiProperty({ readOnly: true })
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
  updatedAt!: Date;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.posts, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ApiProperty({ type: () => [Category] })
  @ManyToMany(() => Category, (category) => category.posts)
  @JoinTable({
    name: 'posts_categories',
    joinColumn: { name: 'post_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  categories!: Category[];
}
