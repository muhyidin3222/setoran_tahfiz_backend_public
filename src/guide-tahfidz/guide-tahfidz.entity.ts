import { literal } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { LevelTahfidzEntity } from 'src/level-tahfidz/level-tahfidz.entity';
import { SchoolEntity } from 'src/school/school.entity';
const { STRING, INTEGER } = DataType;

@Table({
  tableName: 'guide_tahfidz',
})
export class GuideTahfidzEntity extends Model {
  @Column({
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
  })
  id: number;

  @Column({
    allowNull: false,
    type: STRING(100),
  })
  name: string;

  @Column({
    allowNull: true,
    type: INTEGER,
  })
  no: number;

  @Column({
    allowNull: true,
    type: STRING,
  })
  description: string;

  @Column({
    allowNull: false,
    type: INTEGER,
  })
  id_school: number;

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

  @BelongsTo(() => SchoolEntity, {
    targetKey: 'id',
    foreignKey: 'id_school',
  })
  school: SchoolEntity;

  @BelongsTo(() => LevelTahfidzEntity, {
    targetKey: 'id',
    foreignKey: 'id_level_tahfidz',
  })
  levelTahfidz: LevelTahfidzEntity;
}
