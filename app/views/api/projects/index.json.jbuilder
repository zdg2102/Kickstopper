json.array!(@projects) do |project|
  json.partial! "api/projects/tile", project: project
end
