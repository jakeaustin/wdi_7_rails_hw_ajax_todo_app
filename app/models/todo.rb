class Todo < Active::Base
  validates_with BlankValidator
  validates :content, uniqueness: true

end
