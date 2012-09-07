require 'spec_helper'

describe "Search" do

  it 'should return a list of locations based on a search', :js => true do
    visit "/"
    find("input[name='location']").set('Los Angeles')
    click_button "Search"
    page.should have_content "Los Angeles, CA, USA"
  end

end
