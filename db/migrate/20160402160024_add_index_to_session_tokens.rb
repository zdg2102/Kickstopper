class AddIndexToSessionTokens < ActiveRecord::Migration
  def change
    add_index :session_tokens, :token_string
  end
end
