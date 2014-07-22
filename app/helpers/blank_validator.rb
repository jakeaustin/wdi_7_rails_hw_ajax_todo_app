class BlankValidator < ActiveModel::Validator
  def validate(record)
    if record.content.blank?
      record.errors[:base] << "Blank input"
    end
  end
end
