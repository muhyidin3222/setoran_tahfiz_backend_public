import { Table, Column, Model, DataType } from 'sequelize-typescript';
const { STRING, INTEGER } = DataType;

@Table({
  tableName: 'config',
})
export class ConfigEntity extends Model {
  @Column({
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
  })
  id: number;

  @Column({
    allowNull: true,
    type: STRING,
  })
  version_android: string;

  @Column({
    allowNull: true,
    type: STRING,
  })
  version_ios: string;

  @Column({
    allowNull: true,
    type: STRING,
  })
  visi: string;

  @Column({
    allowNull: true,
    type: STRING,
  })
  misi: string;

  @Column({
    allowNull: true,
    type: STRING,
  })
  banner1: string;

  @Column({
    allowNull: true,
    type: STRING,
  })
  banner2: string;

  @Column({
    allowNull: true,
    type: STRING,
  })
  banner3: string;

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
}
