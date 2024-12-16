import { literal } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { PeriodEntity } from 'src/school/period.entity';
import { SchoolEntity } from 'src/school/school.entity';
const { STRING, INTEGER } = DataType;

@Table({
  tableName: 'payment',
})
export class PaymentEntity extends Model {
  @Column({
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
  })
  id: number;

  @Column({
    allowNull: false,
    type: STRING(10),
  })
  transaction_status: string;

  @Column({
    allowNull: true,
    type: STRING,
  })
  status_message: string;

  @Column({
    allowNull: true,
    type: STRING,
  })
  va: string;

  @Column({
    allowNull: true,
    type: STRING,
  })
  no_bank: string;

  @Column({
    allowNull: true,
    type: STRING(10),
  })
  nama_bank: string;

  @Column({
    allowNull: false,
    type: INTEGER,
  })
  amount: number;

  @Column({
    allowNull: false,
    type: STRING(10),
  })
  paid_at: string;

  @Column({
    allowNull: true,
    type: STRING(100),
  })
  additionalData: string;

  @Column({
    allowNull: false,
    type: INTEGER,
  })
  id_period: number;

  @Column({
    allowNull: true,
    type: INTEGER,
  })
  id_school: number;

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

  @BelongsTo(() => SchoolEntity, {
    targetKey: 'id',
    foreignKey: 'id_school',
  })
  school: SchoolEntity;
}
