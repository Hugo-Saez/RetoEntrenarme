import React from 'react';
import {Component} from "react";
import PlacesAutocomplete from 'react-places-autocomplete';
import api from "../apiService";
import CalcService from '../calcService.js';
import ReactChartkick, { ColumnChart } from 'react-chartkick';
import Chart from 'chart.js';
ReactChartkick.addAdapter(Chart);

class Metrics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sport_id:'',
            address: '',
            place_id:'',
            priceCalc: null,
            budgetCalc: null,
            sport_name: '',
            city: ''
        };
    }
    handleChangeSport = event => {
        this.setState({sport_id: event.target.value});
        // console.log('sport_id: ' +  JSON.stringify({sport_id: event.target.value}));
    }
    handleChange = address => {
        this.setState({ address });
    }

    handleSelect = (address, place_id) => {
        this.setState({ address, place_id });

    }
    handleSubmit = (event) => {
        if(!this.state.sport_id || !this.state.address || !this.state.place_id) return;

        this.setState({ priceCalc: null, budgetCalc:null });

        event.preventDefault();
        api.metrics(this.state.sport_id, this.state.place_id)
            .then(response => {
                this.setState({sport_name: response.data[0].sport_name, city: response.data[0].city})
                return Promise.all([CalcService.calcPrice(response.data), CalcService.calcBudget(response.data) ])
            })
            .then(([priceCalc, budgetCalc]) => this.setState({priceCalc, budgetCalc}))
            .catch(console.error);
    }

    render() {

        let isDisabled = (!this.state.sport_id || !this.state.address  || !this.state.place_id) ? {disabled:'true'} : {};
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
                        <input className="form-control" type="number" value={this.state.sport_id} onChange={this.handleChangeSport.bind(this)} />
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

                        <input className="form-control button-submit" type="submit" value="Buscar" onClick={this.handleSubmit} {...isDisabled} />
                    </div>
                )}
            </PlacesAutocomplete>
              { this.state.priceCalc && this.state.budgetCalc && (
                  <div className="table table-metrics container justify-content-center">
                      <h4>{this.state.sport_name}</h4>
                      <table className="table table-metrics">
                          <thead>

                          <tr>
                              <th>Precio mensaje máximo</th>
                              <th>Precio mensaje mínimo</th>
                              <th>Precio mensaje medio</th>
                          </tr>
                          </thead>

                          <tbody>
                          <tr>
                              <td>{this.state.priceCalc.maxMessagePrice}</td>
                              <td>{this.state.priceCalc.minMessagePrice}</td>
                              <td>{this.state.priceCalc.medMessagePrice}</td>
                          </tr>
                          </tbody>
                      </table>
                      <table className="table table-metrics">
                          <thead>
                          <tr>
                              <th>Presupuesto máximo</th>
                              <th>Presupuesto mínimo</th>
                              <th>Presupuesto medio</th>
                          </tr>
                          </thead>

                          <tbody>
                          <tr>
                              <td>{this.state.budgetCalc.maxBudget}</td>
                              <td>{this.state.budgetCalc.minBudget}</td>
                              <td>{this.state.budgetCalc.medBudget}</td>
                          </tr>
                          </tbody>
                      </table>
                      <ColumnChart data={[[this.state.city + "/" + this.state.sport_name, this.state.priceCalc.maxMessagePrice ],["Ciudad/Deporte2", 10],["Ciudad/Deporte3", 6], ["Ciudad/Deporte4", 4], ["Ciudad/Deporte5", 8]]} />
                  </div>
              )}
        </div>
        );

    }
}

export default Metrics;