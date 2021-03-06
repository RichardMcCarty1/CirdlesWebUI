////////////////////////////////////////////////////////////////////////////////////////
// CENTURYDROPDOWN.JS /////////////////////////////////////////////////////////////////
// This component is a selection dropdown to decide the century of the date format ///
// In the case that the user selects a format with YY instead of YYYY ///////////////
////////////////////////////////////////////////////////////////////////////////////

import React from "react";
import { connect } from "react-redux";

// CSS & Styling
import "semantic-ui-react";

// REDUX
import { century } from "../../../../../actions/marsMapMaker";
import { isSesarTitlePresent } from "../../../util/helper";
////////////////////////////////////////////////////
///////////////////////////////////////////////////

class CenturyDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cent: ["", "1900", "2000"]
    };
  }

  searchingEntForDate = () => {
    return (
      isSesarTitlePresent("collection_start_date", this.props.ent) ||
      isSesarTitlePresent("collection_end_date", this.props.ent)
    );
  };

  // uses the clicked list-item in the dropdown to create an object to be passed into the dropdownUpdate action
  // updates specific object in the redux store
  updateValue = e => {
    const newValue = e.target.value;
    const obj = {
      chosenCentury: newValue
    };
    this.props.century(obj);
  };

  render() {
    let num = -1;
    // helper function to list "options" based on the 'type' of field (numbers or letters...)
    let filter = f => {
      num += 1;
      if (num === 0)
        return (
          <option key={num} value="Select Dating Century" disabled hidden>
            Select Century{" "}
          </option>
        );
      else
        return (
          <option key={num} value={f}>
            {f}
          </option>
        );
    };

    // creates the dropdown, uses filter() to specify which items are included in dropdown
    if (
      !this.props.hasTwoYs ||
      (this.props.hasTwoYs &&
        this.props.hasChosenCentury &&
        this.props.hasChosenDropdown) ||
      (this.props.hasChosenCentury && this.searchingEntForDate())
    ) {
      return (
        <select
          style={{ fontFamily: "Lucida Grande" }}
          defaultValue={"Select Dating Century"}
          disabled
          className="ui search dropdown"
          onChange={this.updateValue}
        >
          {this.state.cent.map(field => filter(field))}
        </select>
      );
    } else {
      return (
        <select
          style={{ fontFamily: "Lucida Grande" }}
          className="ui search dropdown"
          onChange={this.updateValue}
        >
          {this.state.cent.map(field => filter(field))}
        </select>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    ent: state.marsMapMaker.entries,
    hasChosenDropdown: state.marsMapMaker.hasChosenDropdownOption,
    hasChosenCentury: state.marsMapMaker.centuryChosen,
    hasTwoYs: state.marsMapMaker.hasTwoYs
  };
};

export default connect(
  mapStateToProps,
  { century }
)(CenturyDropDown);
