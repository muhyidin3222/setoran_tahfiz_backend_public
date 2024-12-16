import { literal } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { UserEntity } from 'src/user/user.entity';
const { STRING, INTEGER } = DataType;

@Table({
  tableName: 'master_class',
})
export class MasterClassEntity extends Model {
  @Column({
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
  })
  id: number;

  @Column({
    allowNull: false,
    type: STRING(50),
  })
  name: string;

  @Column({
    allowNull: false,
    type: INTEGER,
  })
  total_student: number;

  @Column({
    allowNull: false,
    type: STRING(50),
  })
  school_year_start: string;

  @Column({
    allowNull: false,
    type: STRING(50),
  })
  school_year_end: string;

  @Column({
    allowNull: false,
    type: INTEGER,
  })
  id_school: number;

  @Column({
    allowNull: true,
    type: INTEGER,
  })
  id_wali_kelas: number;

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

  @BelongsTo(() => UserEntity, {
    targetKey: 'id',
    foreignKey: 'id_wali_kelas',
  })
  waliKelas: UserEntity;
}
