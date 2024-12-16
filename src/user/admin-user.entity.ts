import { literal } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { SchoolEntity } from 'src/school/school.entity';

const { STRING, INTEGER } = DataType;

@Table({
  tableName: 'admin_user',
})
export class AdminUserEntity extends Model {
  @Column({
    allowNull: false,
    primaryKey: true,
    type: INTEGER,
    autoIncrement: true,
  })
  id: number;

  @Column({
    allowNull: false,
    type: STRING(200),
  })
  email: string;

  @Column({
    allowNull: false,
    type: STRING,
  })
  password: string;

  // @Column({
  //   allowNull: false,
  //   type: INTEGER,
  // })
  // id_role: number;

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

  @BelongsTo(() => SchoolEntity, {
    targetKey: 'id',
    foreignKey: 'id_school',
  })
  school: SchoolEntity;
}
