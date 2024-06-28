import './FormAnswer.css';

const FormAnswer = (props) => {
	return(
		<div className="app2">
			<table>
				<tr>
					<td id="name"> Tipo de Veículo: 
						<b>
						{   (props.typeCar) === 1 ? " Carro" 
					 		: (props.typeCar) === 2 ? " Moto" 
					 		: (props.typeCar) === 3 ? " Caminhão" : ""
				 		}
						</b>
				 </td>
				</tr>
				<tr></tr><tr></tr>
				<tr>
					<td id="age">Valor: <b>{props.amount}</b> </td>
				</tr>
				<tr></tr><tr></tr>
				<tr>
					<td id="gender">Marca: <b>{props.brand}</b> </td>
				</tr>
				<tr></tr><tr></tr>
				<tr>
					<td id="civilStatus">Modelo: <b>{props.model}</b> </td>
				</tr>
				<tr></tr><tr></tr>
				<tr>
					<td id="documentType">Ano/Modelo: <b>{props.yearModel}</b> </td>
				</tr>
				<tr></tr><tr></tr>
				<tr>
					<td id="document">Combustível: <b>{props.fuel}</b> </td>
				</tr>
				<tr></tr><tr></tr>
				<tr>
					<td id="document">Código FIPE: <b>{props.codFipe}</b> </td>
				</tr>
				<tr></tr><tr></tr>
				<tr>
					<td id="document">Mês de Referência: <b>{props.refMonth}</b> </td>
				</tr>
				<tr></tr><tr></tr>
				<tr>
					<td id="document">Sigla Combustível: <b>{props.fuelAbb}</b> </td>
				</tr>
			</table>
		</div>
	)
}

export default FormAnswer;