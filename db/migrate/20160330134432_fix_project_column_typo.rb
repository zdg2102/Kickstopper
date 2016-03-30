class FixProjectColumnTypo < ActiveRecord::Migration
  def change
    rename_column :projects, :project_blub, :project_blurb
  end
end
