require 'json'
require 'open-uri'


class Search < ActiveRecord::Base
  def self.big_quake_list
    lastyear = Date.today - 1.year
    results = JSON.parse(open('http://api.geonames.org/earthquakesJSON?minMagnitude=7&north=90&south=-90&east=180&west=-180&maxRows=100&username=quakeout').read)
    i = 0
    list = Array.new
    results["earthquakes"].each do |earthquake|
      date = Date.parse earthquake["datetime"]
      if date > lastyear
        list << {"magnitude" => earthquake["magnitude"], "datetime" => earthquake["datetime"], "location" =>  "(#{earthquake["lat"].to_s}, #{earthquake["lng"].to_s})", "depth" => earthquake["depth"].to_s}
        i += 1
        if i >= 10
          break
        end
      end
    end
    return list

  end
end
