import { BeforeCreate, BeforeUpdate, Column } from 'sequelize-typescript';
import { INTEGER } from 'sequelize';

export class EntityMaster {
  @Column({
    field: 'created_at',
    type: INTEGER,
  })
  created_at: number;

  @Column({
    field: 'updated_at',
    type: INTEGER,
  })
  updated_at: number;

  @Column({
    field: 'deleted_at',
    type: INTEGER,
  })
  deleted_at: number;

  @BeforeCreate
  createDates() {
    this.created_at = Date.now();
    this.updated_at = Date.now();
  }

  @BeforeUpdate
  updateDates() {
    this.updated_at = Date.now();
  }
}
