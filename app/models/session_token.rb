class SessionToken < ActiveRecord::Base
  validates :user_id, :token_string, presence: true

	belongs_to :user

end
