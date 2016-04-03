class AddDeviseColumnsToUser < ActiveRecord::Migration
  def change
    change_table :users do |t|
      t.string :encrypted_password, null: false, default: ""
      t.change :email, :string, null: false, default: ""
      t.string :confirmation_token
      t.datetime :confirmed_at
      t.datetime :confirmation_sent_at
      t.string :unconfirmed_email
      t.string :reset_password_token
      t.datetime :reset_password_sent_at
      t.datetime :remember_created_at
      t.integer :sign_in_count, default: 0
      t.datetime :current_sign_in_at
      t.datetime :last_sign_in_at
      t.string :current_sign_in_ip
      t.string :last_sign_in_ip
      t.string :authentication_token
      t.string :password_salt
      t.integer :failed_attempts, default: 0
      t.string :unlock_token
      t.datetime :locked_at
    end

    add_index :users, :reset_password_token, unique: true
    add_index :users, :confirmation_token, unique: true
    add_index :users, :unlock_token, unique: true
    add_index :users, :authentication_token, unique: true
  end
end
