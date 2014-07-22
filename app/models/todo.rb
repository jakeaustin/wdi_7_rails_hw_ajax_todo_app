class Todo < ActiveRecord::Base
  validates_with BlankValidator
  validates :content, uniqueness: true

end
