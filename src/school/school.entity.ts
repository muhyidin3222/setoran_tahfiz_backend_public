import { literal } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { PeriodEntity } from './period.entity';
const { STRING, INTEGER } = DataType;

@Table({
  tableName: 'school',
})
export class SchoolEntity extends Model {
  @Column({
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
  })
  id: number;

  @Column({
    allowNull: true,
    type: STRING,
  })
  name: string;

  @Column({
    allowNull: true,
    type: INTEGER,
  })
  total_student: number;

  @Column({
    allowNull: true,
    type: STRING(2000),
  })
  description: string;

  @Column({
    allowNull: true,
    type: STRING,
  })
  photo: string;

  @Column({
    allowNull: true,
    type: INTEGER,
  })
  id_period: number;

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

  @BelongsTo(() => PeriodEntity, {
    targetKey: 'id',
    foreignKey: 'id_period',
  })
  period: PeriodEntity;
}
