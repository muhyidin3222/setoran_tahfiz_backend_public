import { literal } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { TagEntity } from 'src/tag/tag.entity';
const { STRING, INTEGER } = DataType;

@Table({
  tableName: 'berita',
})
export class BeritaEntity extends Model {
  @Column({
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
  })
  id: number;

  @Column({
    allowNull: false,
    type: STRING,
  })
  title: string;

  @Column({
    allowNull: false,
    type: STRING(5000),
  })
  description: string;

  @Column({
    allowNull: true,
    type: STRING,
  })
  image: string;

  @Column({
    allowNull: true,
    type: STRING,
  })
  link: string;

  @Column({
    allowNull: true,
    type: INTEGER,
  })
  top: number;

  @Column({
    allowNull: false,
    type: INTEGER,
  })
  id_school: number;

  @Column({
    allowNull: true,
    type: INTEGER,
  })
  id_tag: number;

  @Column({
    allowNull: false,
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
  })
  created_at: string;

  @Column({
    allowNull: false,
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    onUpdate: literal('CURRENT_TIMESTAMP') as any,
  })
  updated_at: string;

  @Column({
    field: 'deleted_at',
    type: 'TIMESTAMP',
  })
  deleted_at: string;

  @BelongsTo(() => TagEntity, {
    targetKey: 'id',
    foreignKey: 'id_tag',
  })
  tag: TagEntity;
}
