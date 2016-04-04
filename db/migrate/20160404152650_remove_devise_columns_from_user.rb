class RemoveDeviseColumnsFromUser < ActiveRecord::Migration
  def change
    remove_column :users, :encrypted_password
    remove_column :users, :confirmation_token
    remove_column :users, :confirmed_at
    remove_column :users, :confirmation_sent_at
    remove_column :users, :unconfirmed_email
    remove_column :users, :reset_password_token
    remove_column :users, :reset_password_sent_at
    remove_column :users, :sign_in_count
    remove_column :users, :current_sign_in_at
    remove_column :users, :last_sign_in_at
    remove_column :users, :current_sign_in_ip
    remove_column :users, :last_sign_in_ip
    remove_column :users, :authentication_token
    remove_column :users, :password_salt
    remove_column :users, :failed_attempts
    remove_column :users, :unlock_token
    remove_column :users, :locked_at
    change_column :users, :email, :string, null: false
  end
end
