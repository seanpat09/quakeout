require 'spec_helper'

describe "Search" do

  it 'should return a list of locations based on a search' do
    visit "/"
    fill_in "Location", :with => "Decatur, Ga"
    click_button "Search"
    page.should have_content "City of Decatur"
  end

end
