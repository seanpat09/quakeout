class SearchController < ApplicationController

  def index
    @location = params[:location]
    @list = Search.big_quake_list
  end

end
