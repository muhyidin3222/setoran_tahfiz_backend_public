import { literal } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { GuideTahfidzEntity } from 'src/guide-tahfidz/guide-tahfidz.entity';
import { LevelTahfidzEntity } from 'src/level-tahfidz/level-tahfidz.entity';
import { StudentEntity } from 'src/student/student.entity';
import { UserEntity } from 'src/user/user.entity';
const { STRING, INTEGER } = DataType;

@Table({
  tableName: 'user_setoran',
})
export class UserSetoranEntity extends Model {
  @Column({
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
  })
  id: number;

  @Column({
    allowNull: true,
    type: INTEGER,
  })
  id_student: number;

  @Column({
    allowNull: true,
    type: INTEGER,
  })
  id_user_menyimak: number;

  @Column({
    allowNull: true,
    type: INTEGER,
  })
  image: number;

  @Column({
    allowNull: true,
    type: INTEGER,
  })
  id_user: number;

  @Column({
    allowNull: true,
    type: INTEGER,
  })
  id_student_menyimak: number;

  @Column({
    allowNull: true,
    type: INTEGER,
  })
  incorrect: number;

  @Column({
    allowNull: true,
    type: INTEGER,
  })
  nilai: number;

  @Column({
    allowNull: true,
    type: INTEGER,
  })
  id_guide_tahfidz: number;

  @Column({
    allowNull: true,
    type: INTEGER,
  })
  id_level_tahfidz: number;

  @Column({
    allowNull: true,
    type: STRING,
  })
  sound: string;

  @Column({
    allowNull: true,
    type: STRING,
  })
  message: string;

  @Column({
    allowNull: true,
    type: STRING,
  })
  note: string;

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
    foreignKey: 'id_student_menyimak',
  })
  studentMeyimak: StudentEntity;

  @BelongsTo(() => StudentEntity, {
    targetKey: 'id',
    foreignKey: 'id_student',
  })
  student: StudentEntity;

  @BelongsTo(() => UserEntity, {
    targetKey: 'id',
    foreignKey: 'id_user_menyimak',
  })
  userMeyimak: UserEntity;

  @BelongsTo(() => UserEntity, {
    targetKey: 'id',
    foreignKey: 'id_user',
  })
  user: UserEntity;

  @BelongsTo(() => GuideTahfidzEntity, {
    targetKey: 'id',
    foreignKey: 'id_guide_tahfidz',
  })
  guideTahfidz: GuideTahfidzEntity;

  @BelongsTo(() => LevelTahfidzEntity, {
    targetKey: 'id',
    foreignKey: 'id_level_tahfidz',
  })
  levelTahfidz: LevelTahfidzEntity;
}
