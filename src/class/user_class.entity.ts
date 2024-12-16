import { literal } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { StudentEntity } from 'src/student/student.entity';
import { MasterClassEntity } from './master_class.entity';
const { INTEGER } = DataType;

@Table({
  tableName: 'user_class',
})
export class UserClassEntity extends Model {
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
  id_student: number;

  @Column({
    allowNull: false,
    type: INTEGER,
  })
  id_master_class: number;

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

  @BelongsTo(() => MasterClassEntity, {
    targetKey: 'id',
    foreignKey: 'id_master_class',
  })
  masterClass: MasterClassEntity;

  @BelongsTo(() => StudentEntity, {
    targetKey: 'id',
    foreignKey: 'id_student',
  })
  student: StudentEntity;
}
