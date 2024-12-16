import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { UstadzClassEntity } from 'src/class/ustadz-class.entity';

const { STRING, INTEGER } = DataType;

@Table({
  tableName: 'users',
})
export class UserEntity extends Model {
  @Column({
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
  })
  id: number;

  @Column({
    allowNull: true,
    type: STRING(200),
  })
  name: string;

  @Column({
    allowNull: false,
    type: STRING(50),
  })
  email: string;

  @Column({
    allowNull: true,
    type: STRING(50),
  })
  phone: string;

  @Column({
    allowNull: true,
    type: INTEGER,
  })
  step_register: number;

  @Column({
    allowNull: true,
    type: STRING(1000),
  })
  password: string;

  @Column({
    allowNull: true,
    type: STRING(100),
  })
  id_google: string;

  @Column({
    allowNull: true,
    type: STRING,
  })
  photo: string;

  @Column({
    allowNull: true,
    type: STRING(10),
  })
  gender: string;

  @Column({
    allowNull: true,
    type: STRING(1000),
  })
  fcm_token: string;

  @Column({
    allowNull: true,
    type: STRING(1000),
  })
  token: string;

  @Column({
    allowNull: true,
    type: STRING(50),
  })
  date_of_birth: string;

  @Column({
    allowNull: true,
    type: STRING(1000),
  })
  about: string;

  @Column({
    allowNull: true,
    type: STRING(50),
  })
  type_user: string;

  @Column({
    allowNull: true,
    type: STRING(10),
  })
  version: string;

  @Column({
    allowNull: true,
    type: STRING,
  })
  location: string;

  @Column({
    allowNull: true,
    type: INTEGER,
  })
  id_school: number;

  @Column({
    allowNull: true,
    type: INTEGER,
  })
  id_student: number;

  @Column({
    field: 'created_at',
    type: STRING,
  })
  created_at: string;

  @Column({
    field: 'updated_at',
    type: STRING,
  })
  updated_at: string;

  @Column({
    field: 'deleted_at',
    type: STRING,
  })
  deleted_at: string;

  @BelongsTo(() => UstadzClassEntity, {
    targetKey: 'id_ustadz',
    foreignKey: 'id',
  })
  userClass: UstadzClassEntity;
}
