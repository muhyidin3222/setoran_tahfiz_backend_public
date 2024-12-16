import { literal } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { LevelTahfidzEntity } from 'src/level-tahfidz/level-tahfidz.entity';
import { StudentEntity } from 'src/student/student.entity';
const { STRING, INTEGER } = DataType;

@Table({
  tableName: 'achievement',
})
export class AchievementEntity extends Model {
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
  name: string;

  @Column({
    allowNull: true,
    type: STRING,
  })
  image_achievement: string;

  @Column({
    allowNull: true,
    type: STRING,
  })
  uuid: string;

  @Column({
    allowNull: true,
    type: STRING,
  })
  link_report: string;

  @Column({
    allowNull: true,
    type: STRING,
  })
  link_vidio: string;

  @Column({
    allowNull: false,
    type: INTEGER,
  })
  id_school: number;

  @Column({
    allowNull: false,
    type: INTEGER,
  })
  id_student: number;

  @Column({
    allowNull: false,
    type: INTEGER,
  })
  id_level_tahfidz: number;

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

  @BelongsTo(() => StudentEntity, {
    targetKey: 'id',
    foreignKey: 'id_student',
  })
  student: StudentEntity;

  @BelongsTo(() => LevelTahfidzEntity, {
    targetKey: 'id',
    foreignKey: 'id_level_tahfidz',
  })
  levelTahfidz: LevelTahfidzEntity;
}
