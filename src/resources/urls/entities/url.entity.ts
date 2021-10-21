import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { generate } from 'shortid';

@ObjectType()
@Entity({ name: 'urls' })
export class Url {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field()
  @Column({ unique: true })
  slug: string;

  @Field()
  @Column()
  target: string;

  @Field()
  @Column()
  visits: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  generateSlug() {
    if (!this.slug) {
      this.slug = generate();
    }
  }
}
