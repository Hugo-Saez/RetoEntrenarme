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
            priceCalcSelect: null,
            budgetCalcSelect: null,
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

        this.setState({ priceCalc: null, budgetCalc:null, priceTopFiveCalc:null, budgetTopFiveCalc:null });

        event.preventDefault();
        api.metrics(this.state.sport_id, this.state.place_id)
            .then(response => {
                // console.log("datos consulta: " + JSON.stringify(response));
                this.setState({sport_name: response.data[0].sport_name, city: response.data[0].city})
                return Promise.all([CalcService.calcPrice(response.data), CalcService.calcBudget(response.data) ])
            })
            .then(([priceCalcSelect, budgetCalcSelect]) => this.setState({priceCalcSelect, budgetCalcSelect}))
            .catch(console.error);
        api.metricsAll("","")
            .then(response => {
                this.setState({})
                return Promise.all([CalcService.calcPrice(response.data), CalcService.calcBudget(response.data), CalcService.calcPriceTopFive(response.data), CalcService.calcBudgetTopFive(response.data) ])
            })
            .then(([priceCalc, budgetCalc, priceTopFiveCalc, budgetTopFiveCalc]) => this.setState({priceCalc, budgetCalc, priceTopFiveCalc, budgetTopFiveCalc}))
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
                        <h4>{this.state.sport_name + " / " + this.state.city}</h4>
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
                                <td>{this.state.priceCalcSelect.maxMessagePrice}</td>
                                <td>{this.state.priceCalcSelect.minMessagePrice}</td>
                                <td>{this.state.priceCalcSelect.medMessagePrice}</td>
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
                                <td>{this.state.budgetCalcSelect.maxBudget}</td>
                                <td>{this.state.budgetCalcSelect.minBudget}</td>
                                <td>{this.state.budgetCalcSelect.medBudget}</td>
                            </tr>
                            </tbody>
                        </table>
                        <hr></hr>
                        <h4>Gráfica 5 combinaciones con precio por mensaje más alto</h4>
                        <ColumnChart id="border-graphic" data={[
                            [this.state.priceTopFiveCalc.arrayPriceTopFive[0].city + " / " + this.state.priceTopFiveCalc.arrayPriceTopFive[0].sport_id, this.state.priceTopFiveCalc.arrayPriceTopFive[0].price_per_lead],
                            [this.state.priceTopFiveCalc.arrayPriceTopFive[1].city + " / " + this.state.priceTopFiveCalc.arrayPriceTopFive[1].sport_id, this.state.priceTopFiveCalc.arrayPriceTopFive[1].price_per_lead],
                            [this.state.priceTopFiveCalc.arrayPriceTopFive[2].city + " / " + this.state.priceTopFiveCalc.arrayPriceTopFive[2].sport_id, this.state.priceTopFiveCalc.arrayPriceTopFive[2].price_per_lead],
                            [this.state.priceTopFiveCalc.arrayPriceTopFive[3].city + " / " + this.state.priceTopFiveCalc.arrayPriceTopFive[3].sport_id, this.state.priceTopFiveCalc.arrayPriceTopFive[3].price_per_lead],
                            [this.state.priceTopFiveCalc.arrayPriceTopFive[4].city + " / " + this.state.priceTopFiveCalc.arrayPriceTopFive[4].sport_id, this.state.priceTopFiveCalc.arrayPriceTopFive[4].price_per_lead]
                        ]} />
                        <hr></hr>
                        <h4>Gráfica 5 combinaciones con presupuesto más alto</h4>
                        <ColumnChart id="border-graphic" data={[
                            [this.state.budgetTopFiveCalc.arrayBudgetTopFive[0].city + " / " + this.state.budgetTopFiveCalc.arrayBudgetTopFive[0].sport_id, this.state.budgetTopFiveCalc.arrayBudgetTopFive[0].monthly_budget],
                            [this.state.budgetTopFiveCalc.arrayBudgetTopFive[1].city + " / " + this.state.budgetTopFiveCalc.arrayBudgetTopFive[1].sport_id, this.state.budgetTopFiveCalc.arrayBudgetTopFive[1].monthly_budget],
                            [this.state.budgetTopFiveCalc.arrayBudgetTopFive[2].city + " / " + this.state.budgetTopFiveCalc.arrayBudgetTopFive[2].sport_id, this.state.budgetTopFiveCalc.arrayBudgetTopFive[2].monthly_budget],
                            [this.state.budgetTopFiveCalc.arrayBudgetTopFive[3].city + " / " + this.state.budgetTopFiveCalc.arrayBudgetTopFive[3].sport_id, this.state.budgetTopFiveCalc.arrayBudgetTopFive[3].monthly_budget],
                            [this.state.budgetTopFiveCalc.arrayBudgetTopFive[4].city + " / " + this.state.budgetTopFiveCalc.arrayBudgetTopFive[4].sport_id, this.state.budgetTopFiveCalc.arrayBudgetTopFive[4].monthly_budget]
                        ]} />
                    </div>
                )}
            </div>
        );

    }
}

export default Metrics;