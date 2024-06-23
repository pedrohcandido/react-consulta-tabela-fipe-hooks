import React from "react";
import './Form.css'
import FormAnswer from '../formAnswer'

class Form extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			carType: "",

			carBrandList: [],
			carBrandSelected: 0,

			carModelList: [],
			carModelSelected: 0,

			carYearList: [],
			carYearSelected: "",

			typeCar: "",
			amount: "",
			brand: "",
			model: "",
			yearModel: "",
			fuel: "",
			codFipe: "",
			refMonth: "",
			fuelAbb: "",

		}
	}

	handleChange = (event) => {
		this.setState({
			isError: false,
			isSend: false,
			document: event.target.value
		})
	}

	handleCarBrand = (event) => {
		fetch(`https://parallelum.com.br/fipe/api/v1/${this.state.carType}/marcas`)
			.then((res) => res.json())
			.then((list) => {
				this.setState({carBrandList: list})
			})
	}

	handleCarModel = (event) => {
		fetch(`https://parallelum.com.br/fipe/api/v1/${this.state.carType}/marcas/${this.state.carBrandSelected}/modelos`)
		.then((res) => res.json())
			.then((list) => {
				this.setState({carModelList: list.modelos})
			})
	}

	handleCarYear = (event) => {
		fetch(`https://parallelum.com.br/fipe/api/v1/${this.state.carType}/marcas/${this.state.carBrandSelected}/modelos/${this.state.carModelSelected}/anos`)
		.then((res) => res.json())
			.then((list) => {
				this.setState({carYearList: list})
			})
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.setState({ isSend: true })

		fetch(`https://parallelum.com.br/fipe/api/v1/${this.state.carType}/marcas/${this.state.carBrandSelected}/modelos/${this.state.carModelSelected}/anos/${this.state.carYearSelected}`)
		.then((res) => res.json())
			.then((list) => {
				this.setState({typeCar: list.TipoVeiculo,amount: list.Valor,brand: list.Marca, 
											model: list.Modelo,yearModel: list.AnoModelo, fuel: list.Combustivel, 
											codFipe: list.CodigoFipe, refMonth: list.MesReferencia, fuelAbb: list.SiglaCombustivel
										})
			})
			this.setState({carType: "", carBrandList: [], carBrandSelected: 0, carModelList: [], carModelSelected: 0, carYearList: [], carYearSelected: "",})
		document.getElementById("myForm").reset()
	};

	render() {
		return (
			<>
			<div className="app">
				<form id="myForm" onSubmit={this.handleSubmit.bind(this)}>
					
				<label for="carType">Escolha o Tipo do Veículo</label>
						<select name="carType" 
										id="carType"
										onChange={(event) => this.setState({ carType: event.target.value})}
										required
										>
							<option selected value="">Selecione uma opção</option>
								<option value={"carros"}>Carro</option>
								<option value={"motos"}>Moto</option>
								<option value={"caminhoes"}>Caminhão</option>
					</select>
					<br/><br/>

					<label for="carBrand">Escolha a Marca do Veículo</label>
						<select name="carBrand" 
										id="carBrand"
										onChange={(event) => this.setState({ carBrandSelected: event.target.value})}
										required
										disabled={this.state.carType === "" ? true : false }
										onClick={this.handleCarBrand}
										>
							<option selected value="">Selecione uma opção</option>
							{this.state.carBrandList.map( (brand) => (
								<option key={brand.codigo} value={brand.codigo}>{brand.nome}</option>
							))}
					</select>
					<br/><br/>

					<label for="carModel">Escolha o Modelo do Veículo</label>
						<select name="carModel" 
										id="carModel"
										onChange={(event) => this.setState({ carModelSelected: event.target.value})}
										required
										disabled={this.state.carBrandSelected === 0 || this.state.carType === "" ? true : false }
										onClick={this.handleCarModel}
										>
							<option selected value="">Selecione uma opção</option>
							{this.state.carModelList.map( (carModel) => (
								<option key={carModel.codigo} value={carModel.codigo}>{carModel.nome}</option>
							))}
					</select>

					<br/><br/>

					<label for="carYear">Escolha o Ano do Veículo</label>
						<select name="carYear" 
										id="carYear"
										onChange={(event) => this.setState({ carYearSelected: event.target.value})}
										required
										disabled={this.state.carBrandSelected === 0 || this.state.carModelSelected === 0 || this.state.carType === "" ? true : false }
										onClick={this.handleCarYear}
										>
							<option selected value="">Selecione uma opção</option>
							{this.state.carYearList.map( (carYear) => (
								<option key={carYear.codigo} value={carYear.codigo}>{carYear.nome}</option>
							))}
					</select>
					<br/><br/>

					<button type="submit"> Consultar FIPE </button>
				</form>

			</div>
			<FormAnswer 
									typeCar={this.state.typeCar}
									amount={this.state.amount}
									brand={this.state.brand}
									model={this.state.model}
									yearModel={this.state.yearModel}
									fuel={this.state.fuel}
									codFipe={this.state.codFipe}
									refMonth={this.state.refMonth}
									fuelAbb={this.state.fuelAbb}
									>
			</FormAnswer>
			</>
		)
	}

}

export default Form;