import React, { Component } from "react";

import "./Calculator.css";

import Button from "../components/Button";
import Display from "../components/Display";

const initalState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};
export default class Calculator extends Component {
  state = { ...initalState };

  constructor(props) {
    super(props);

    this.clearMemory = this.clearMemory.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigit = this.addDigit.bind(this);
  }

  clearMemory() {
    this.setState({ ...initalState });
  }

  setOperation(operation) {
    {
      /* Verifico se é o primeiro valor do Array */
    }
    if (this.state.current === 0) {
      {
        /*Altero os parametros passando o currenty 1 q vai para outra posição do Array, clearDisplay limpa */
      }
      this.setState({ operation, current: 1, clearDisplay: true });
    } else {
      {
        /*Verifico se o clique foi no campo = */
      }
      const equals = operation === "=";

      {
        /* Caso foi outra operação nova, pega a operação anterior para o calculo*/
      }
      const currentOperation = this.state.operation;

      {
        /*Faz um clone do array de valores */
      }
      const values = [...this.state.values];
      try {
        {
          /* Executa a operação e armazena no array posição 0 
          ' ${currentOperation} ${values[1]}'*/
        }

        const result = this.performsOperation(
          values[0],
          currentOperation,
          values[1]
        );

        values[0] = result;

        {
          /* A posição 1 será zerada para receber novos valores */
        }
        values[1] = 0;
      } catch (e) {
        console.log(e);
        values[0] = this.state.values[0];
      }
      {
        /* Coloca os valores no Estado setState para aparecer na tela, são eles:
        displayValue é o q vai aparecer na tela, operation se a variavel EQUALS foi 
        apertada então o operation recebe null e caso não recebe novo valor, current 
        recebe 0 caso EQUALS seja TRUE e 1 caso seja FALSE, clearDisplay receberá a 
        negativa de EQUALS para ver se limpa ou não o display e por ultimo passa o 
        array com novos valores */
      }
      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      });
    }
  }

  performsOperation(values1, operation, values2) {
    let result;

    switch (operation) {
      case "+":
        result = values1 + values2;
        break;

      case "-":
        result = values1 - values2;
        break;

      case "*":
        result = values1 * values2;
        break;

      case "/":
        result = values1 / values2;
        break;

      default:
        break;
    }

    return result;
  }

  addDigit(n) {
    {
      /* Manter somente um click do '.' */
    }
    if (n === "." && this.state.displayValue.includes(".")) {
      return;
    }

    {
      /* Controla o limpar para a entrada do 0 a esquerda, não permitindo. 
      Caso não seja, limpa e adiciona novo numero */
    }
    const newClearDisplay =
      this.state.displayValue === "0" || this.state.clearDisplay;

    {
      /*Controla se o display vai ser limpo ou não e inclui o valor do displayvalue*/
    }
    const newCurrentValue = newClearDisplay ? "" : this.state.displayValue;

    {
      /* Inclui o valor q esta em currentvalue + o valor clicado */
    }
    const newDisplayValue = newCurrentValue + n;

    {
      /* altera valore na tela e muda o status da variavel que controla as entradas */
    }
    this.setState({ displayValue: newDisplayValue, clearDisplay: false });

    if (n !== ".") {
      {
        /* Pega o index q está manipulando o Array */
      }
      const i = this.state.current;

      {
        /* Adiciono o novo valor convertendo ele em Float */
      }
      const newValue = parseFloat(newDisplayValue);

      {
        /* Duplico o array para alterar os valores*/
      }
      const values = [...this.state.values];

      values[i] = newValue;

      {
        /*Após ajustar o array clonado, seto ele no meu Estado (setState) */
      }
      this.setState({ values });

      console.log(values);
    }
  }
  render() {
    return (
      <div className="Calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" click={(_) => this.clearMemory()} triple />
        <Button label="/" click={this.setOperation} operation />
        <Button label="7" click={this.addDigit} />
        <Button label="8" click={this.addDigit} />
        <Button label="9" click={this.addDigit} />
        <Button label="*" click={this.setOperation} operation />
        <Button label="4" click={this.addDigit} />
        <Button label="5" click={this.addDigit} />
        <Button label="6" click={this.addDigit} />
        <Button label="-" click={this.setOperation} operation />
        <Button label="1" click={this.addDigit} />
        <Button label="2" click={this.addDigit} />
        <Button label="3" click={this.addDigit} />
        <Button label="+" click={this.setOperation} operation />
        <Button label="0" click={this.addDigit} double />
        <Button label="." click={this.addDigit} />
        <Button label="=" click={this.setOperation} operation />
      </div>
    );
  }
}
