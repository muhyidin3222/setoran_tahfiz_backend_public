import { literal } from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';
const { STRING, INTEGER } = DataType;

@Table({
  tableName: 'period',
})
export class PeriodEntity extends Model {
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
  period_end: string;

  @Column({
    allowNull: false,
    type: STRING(10),
  })
  period_start: string;

  @Column({
    allowNull: false,
    type: INTEGER,
  })
  month: number;

  @Column({
    allowNull: false,
    type: INTEGER,
  })
  total_price: number;

  @Column({
    allowNull: false,
    type: INTEGER,
  })
  id_school: number;

  @Column({
    allowNull: false,
    type: INTEGER,
  })
  id_payment: number;

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

  // @BelongsTo(() => TagEntity, {
  //   targetKey: 'id',
  //   foreignKey: 'id_tag',
  // })
  // tag: TagEntity;
}
