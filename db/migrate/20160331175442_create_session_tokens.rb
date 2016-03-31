class CreateSessionTokens < ActiveRecord::Migration
  def change
    create_table :session_tokens do |t|
			t.integer :user_id, null: false
			t.string :token_string, null: false

      t.timestamps null: false
    end

		add_index :session_tokens, :user_id
		add_foreign_key :session_tokens, :users
  end
end
