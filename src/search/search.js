import React, {Component} from 'react';
import './search.scss';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: props.searchText,
    }
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleChengeInput = this.handleChengeInput.bind(this);
  }

  handleChengeInput(e) {
    this.setState({
      searchText: e.target.value
    });
  }

  handleSubmitForm(e) {
    e.preventDefault();
    this.props.handleSubmitForm(this.state.searchText);
  }

  render() {
    let {searchText} = this.state;
    return (
      <form action="index.php" className = 'search' onSubmit = {this.handleSubmitForm}>
        <input type="text" value={searchText} placeholder="Фильтр" onChange = {this.handleChengeInput} />
        <input type="submit" value="Ok"  />
      </form>
    )
  }
}