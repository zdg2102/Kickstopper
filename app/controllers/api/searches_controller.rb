class Api::SearchesController < ApplicationController

  def search
    # pg_search returns a table that is very unfriendly to
    # additional joining (all project.* fields are included, making
    # it impossible to do aggregates, and the ranking field is returned
    # with a randomized alias, so it can't be extracted)

    # FINDTAG fix this to preserve search ranking

    # so first the ids are extracted
    valid_project_ids = Project.global_project_search(params[:term])
      .select("projects.id AS id").pluck(:id)
    # then a union-all psuedo-table is built for interpolation,
    # so the search result ranking can be preserved
    # project_search_table = valid_project_ids.each_with_index.map do |id, index|
    #   new_line = "SELECT #{id} project_id, #{index + 1} project_rank"
    #   new_line += "\nUNION ALL" unless index == valid_project_ids.size.pred
    #   new_line
    # end
    # project_search_table = project_search_table.join("\n")
    #

    #
    # @projects = Project.find_by_sql(<<-SQL)
    #   SELECT
    #     projects.*, COUNT(users.id) AS backer_count, SUM(pledges.pledge_amount)
    #       AS amount_pledged
    #   FROM
    #     projects
    #   INNER JOIN
    #     "rewards" ON "rewards"."project_id" = "projects"."id"
    #   INNER JOIN
    #     "pledges" ON "pledges"."reward_id" = "rewards"."id"
    #   INNER JOIN
    #     "users" ON "users"."id" = "pledges"."user_id"
    #   GROUP BY
    #     projects.id
    # SQL
    #
    # debugger

    # @projects = @projects.includes(:creator, :images)


    results = Project.where(id: valid_project_ids)
    filter_params = params[:projects] ? params[:projects] : {}
    filter_params[:per_page] = 4
    filter = FilterProjects.new(filter_params)
    @projects = filter.matching_projects(results).includes(:creator, :images)
    render "api/projects/index"
  end

end
