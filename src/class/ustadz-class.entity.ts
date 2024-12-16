import { literal } from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';
const { INTEGER } = DataType;

@Table({
  tableName: 'ustadz_class',
})
export class UstadzClassEntity extends Model {
  @Column({
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
  })
  id: number;

  @Column({
    allowNull: false,
    type: INTEGER,
  })
  id_ustadz: number;

  @Column({
    allowNull: false,
    type: INTEGER,
  })
  id_master_class: number;

  @Column({
    allowNull: false,
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
}
