class Image < ActiveRecord::Base
  validates :imageable_id, :imageable_type, presence: true

  belongs_to :imageable, polymorphic: true

  has_attached_file :picture
  validates_attachment_content_type :picture, content_type: /\Aimage\/.*\Z/
  validates_attachment_presence :picture

end
