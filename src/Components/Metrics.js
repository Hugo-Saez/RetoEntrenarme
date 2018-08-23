import React from 'react';
import {Component} from "react";
import PlacesAutocomplete from 'react-places-autocomplete';
import api from "../apiService";
import CalcService from '../calcService.js';
class Metrics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sport_id:'',
            address: '',
            place_id:'',
            priceCalc: null,
            budgetCalc: null
        };
    }
    handleChangeSport = event => {
        this.setState({sport_id: event.target.value});
        console.log('sport_id: ' +  JSON.stringify({sport_id: event.target.value}));
    }
    handleChange = address => {
        this.setState({ address });
    }

    handleSelect = (address, place_id) => {
        this.setState({ address, place_id });

    }
    handleSubmit = event => {
        event.preventDefault();
        api.metrics(this.state.sport_id, this.state.place_id)
            .then(response => Promise.all([CalcService.calcPrice(response.data), CalcService.calcBudget(response.data) ]))
            .then(([priceCalc, budgetCalc]) => this.setState({priceCalc, budgetCalc}))
            .catch(console.error);
    }

    render() {
        return (
          <div>
            <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div className="container justify-content-center">
                        Deporte:
                        <input className="form-control" type="text" value={this.state.sport_id} onChange={this.handleChangeSport.bind(this)} />
                        Ciudad:
                        <input
                            {...getInputProps({
                                placeholder: 'Search Places ...',
                                className: 'form-control',
                            })}
                        />
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className: 'form-control',
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                        <input className="form-control button-submit" type="submit" value="Buscar" onClick={this.handleSubmit} />
                    </div>
                )}
            </PlacesAutocomplete>
              { this.state.priceCalc && this.state.budgetCalc && (
                  <div className="container justify-content-center">
                      <h6>Precio por mensaje máximo: {this.state.priceCalc.maxMessagePrice}</h6>
                      <h6>Precio por mensaje mínimo: {this.state.priceCalc.minMessagePrice}</h6>
                      <h6>Precio por mensaje medio: {this.state.priceCalc.medMessagePrice}</h6>
                      <h6>Presupuesto máximo: {this.state.budgetCalc.maxBudget}</h6>
                      <h6>Presupuesto mínimo: {this.state.budgetCalc.minBudget}</h6>
                      <h6>Presupuesto medio: {this.state.budgetCalc.medBudget}</h6>
                  </div>
              )}
        </div>
        );

    }
}

export default Metrics;