import { literal } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { BeritaEntity } from 'src/berita/berita.entity';
import { UserSetoranEntity } from 'src/setoran-tahfidz/user-setoran.entity';
import { UserEntity } from 'src/user/user.entity';
const { STRING, INTEGER } = DataType;

@Table({
  tableName: 'notification',
})
export class NotificationEntity extends Model {
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
  description: string;

  @Column({
    allowNull: true,
    type: STRING(50),
  })
  screen: string;

  @Column({
    allowNull: true,
    type: INTEGER,
  })
  id_berita: number;

  @Column({
    allowNull: true,
    type: INTEGER,
  })
  id_setoran: number;

  @Column({
    allowNull: true,
    type: INTEGER,
  })
  id_sertifikat: number;

  @Column({
    allowNull: false,
    type: INTEGER,
  })
  id_user: number;

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

  @BelongsTo(() => BeritaEntity, {
    targetKey: 'id',
    foreignKey: 'id_berita',
  })
  berita: BeritaEntity;

  @BelongsTo(() => UserSetoranEntity, {
    targetKey: 'id',
    foreignKey: 'id_setoran',
  })
  userSetoran: UserSetoranEntity;

  @BelongsTo(() => UserEntity, {
    targetKey: 'id',
    foreignKey: 'id_user',
  })
  user: UserEntity;
}
