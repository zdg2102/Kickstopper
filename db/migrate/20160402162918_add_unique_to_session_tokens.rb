class AddUniqueToSessionTokens < ActiveRecord::Migration
  def change
    remove_index :session_tokens, :token_string
    add_index :session_tokens, :token_string, unique: true
  end
end
