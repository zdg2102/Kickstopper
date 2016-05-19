if @type == "main"
  json.partial! "api/projects/main", project: @project
elsif @type == "panel"
  json.partial! "api/projects/panel", project: @project
elsif @type == "tile"
  json.partial! "api/projects/tile", project: @project
end
