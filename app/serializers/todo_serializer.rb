class TodoSerializer < ActiveModel::Serializer
  attributes :id, :content, :created_at, :completed, :completed_at
end
