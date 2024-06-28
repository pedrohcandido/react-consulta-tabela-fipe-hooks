import React, { useState } from "react";
import './Form.css'
import FormAnswer from '../formAnswer'

export default function Form() {
	const [carType, setCarType] = useState("")
	const [carBrandList, setCarBrandList] = useState([])
	const [carBrandSelected, setCarBrandSelected] = useState(0)
	const [carModelList, setCarModelList] = useState([])
	const [carModelSelected, setCarModelSelected] = useState(0)
	const [carYearList, setCarYearList] = useState([])
	const [carYearSelected, setCarYearSelected] = useState("")
	const [typeCar, setTypeCar] = useState("")
	const [amount, setAmount] = useState("")
	const [brand, setBrand] = useState("")
	const [model, setModel] = useState("")
	const [yearModel, setYearModel] = useState("")
	const [fuel, setFuel] = useState("")
	const [codFipe, setCodFipe] = useState("")
	const [refMonth, setRefMonth] = useState("")
	const [fuelAbb, setFuelAbb] = useState("")

const handleCarBrand = (event) => {
	fetch(`https://parallelum.com.br/fipe/api/v1/${carType}/marcas`)
			.then((res) => res.json())
			.then((list) => {
				console.log(list)
				setCarBrandList(list)
			})
	}

const handleCarModel = (event) => {
	fetch(`https://parallelum.com.br/fipe/api/v1/${carType}/marcas/${carBrandSelected}/modelos`)
			.then((res) => res.json())
				.then((list) => {
				setCarModelList(list.modelos)
			})
	}

const handleCarYear = (event) => {
	fetch(`https://parallelum.com.br/fipe/api/v1/${carType}/marcas/${carBrandSelected}/modelos/${carModelSelected}/anos`)
			.then((res) => res.json())
				.then((list) => {
					setCarYearList(list)
				})
	}

const handleSubmit = (event) => {
		event.preventDefault();

		fetch(`https://parallelum.com.br/fipe/api/v1/${carType}/marcas/${carBrandSelected}/modelos/${carModelSelected}/anos/${carYearSelected}`)
			.then((res) => res.json())
				.then((list) => {
					setTypeCar(list.TipoVeiculo)
					setAmount(list.Valor)
					setBrand(list.Marca)
					setModel(list.Modelo)
					setYearModel(list.AnoModelo)
					setFuel(list.Combustivel)
					setCodFipe(list.CodigoFipe)
					setRefMonth(list.MesReferencia)
					setFuelAbb(list.SiglaCombustivel)
				})
			setCarType("")
			setCarBrandList([])
			setCarBrandSelected(0)
			setCarModelList([])
			setCarModelSelected(0)
			setCarYearList([])
			setCarYearSelected("")

		document.getElementById("myForm").reset()
	};
		return (
			<>
			<div className="app">
				<form id="myForm" onSubmit={handleSubmit}>
					
				<label for="carType">Escolha o Tipo do Veículo</label>
						<select name="carType" 
										id="carType"
										onChange={(event) => setCarType(event.target.value)}
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
										onChange={(event) => setCarBrandSelected(event.target.value)}
										required
										disabled={carType === "" ? true : false }
										onClick={handleCarBrand}
										>
							<option selected value="">Selecione uma opção</option>
							{carBrandList.map( (brand) => (
								<option key={brand.codigo} value={brand.codigo}>{brand.nome}</option>
							))}
					</select>
					<br/><br/>

					<label for="carModel">Escolha o Modelo do Veículo</label>
						<select name="carModel" 
										id="carModel"
										onChange={(event) => setCarModelSelected(event.target.value)}
										required
										disabled={carBrandSelected === 0 || carType === "" ? true : false }
										onClick={handleCarModel}
										>
							<option selected value="">Selecione uma opção</option>
							{carModelList.map( (carModel) => (
								<option key={carModel.codigo} value={carModel.codigo}>{carModel.nome}</option>
							))}
					</select>

					<br/><br/>

					<label for="carYear">Escolha o Ano do Veículo</label>
						<select name="carYear" 
										id="carYear"
										onChange={(event) => setCarYearSelected(event.target.value)}
										required
										disabled={carBrandSelected === 0 || carModelSelected === 0 || carType === "" ? true : false }
										onClick={handleCarYear}
										>
							<option selected value="">Selecione uma opção</option>
							{carYearList.map( (carYear) => (
								<option key={carYear.codigo} value={carYear.codigo}>{carYear.nome}</option>
							))}
					</select>
					<br/><br/>

					<button type="submit"> Consultar FIPE </button>
				</form>

			</div>
			<FormAnswer 
									typeCar={typeCar}
									amount={amount}
									brand={brand}
									model={model}
									yearModel={yearModel}
									fuel={fuel}
									codFipe={codFipe}
									refMonth={refMonth}
									fuelAbb={fuelAbb}
									>
			</FormAnswer>
			</>
		)
}