class DropAuthorizations < ActiveRecord::Migration
  def change
    drop_table :authorizations
  end
end
