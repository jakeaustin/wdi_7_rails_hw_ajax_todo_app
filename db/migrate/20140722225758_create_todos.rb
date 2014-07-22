class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.text :content, null: false
      t.boolean :completed, default: false
      t.datetime :completed_at

      t.timestamps
    end
  end
end
