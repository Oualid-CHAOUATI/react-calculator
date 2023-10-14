import { useReducer, useState } from "react";
import "./App.scss";
import { BtnNumber } from "./Components/BtnNumber/BtnNumber";
import Afficher from "./Components/Afficheur/Afficheur";
import { SwitchBtn } from "./Components/SwitchBtn/SwitchBtn";

const CALC_ACTIONS = {
  TYPE: "type",
  OPERATE: "operate",
  TOGGLE_PHONE: "TOGGLE_PHONE",
  CLEAR: "clear",
};

const INITIAL_STATE = {
  operandStr1: "",
  operandStr2: "",
  operation: null,
  displayedResult: "",
  displayedExpression: "",
  isOn: true,
};
const handleTyping = ({ state, digitOrPoint }) => {
  if (state.operation === "=") {
    //1+2=3 .. puis on tape un chiffre ou un point => nouveau calcul

    return {
      ...state,
      operation: null,
      operandStr2: "",
      operandStr1: digitOrPoint,
      displayedResult: digitOrPoint,
    };
  }
  // n1 vide ? et y'a un opérateur ? l'ppliquer sur n1
  if ("+-".includes(state.operation) && state.operandStr1 == "") {
    const op1 = String(state.operation) + String(digitOrPoint);
    return {
      ...state,
      operandStr1: op1,
      displayedResult: op1,
    };
  }
  // on est entrain de saisir le  premier operand
  if (state.operation == null) {
    const op1 = String(state.operandStr1) + String(digitOrPoint);
    return {
      ...state,
      operandStr1: op1,
      displayedResult: op1,
    };
  }
  //else : saisir le deuxieme operand

  return {
    ...state,
    operandStr2: state.operandStr2 + digitOrPoint,
    displayedResult: state.displayedResult + digitOrPoint,
  };
};

const handleOperation = ({ state, operation }) => {
  //nombre 1 pas saisi ? on accepte que + - et =
  // = parceque  (-1=)==(n1="" n2="1" et op = '-' )

  // if (typingNumberString1 == "" && !"+-=".includes(operator)) return;
  // }
  if (state.operandStr1 === "") {
    if (!"+-".includes(operation)) return state;
    //else
    return { ...state, operation, displayedResult: operation };
  }

  if (state.operandStr2 == "") {
    if (operation == "=") return state;
    return {
      ...state,
      operation,
      displayedResult: state.operandStr1 + " " + operation,
    };
  }

  //else -> calc n1+n2

  const result = calc({
    n1: state.operandStr1,
    n2: state.operandStr2,
    operation: state.operation,
  });

  const operandStr1 = result;

  let displayedResult = result;
  if (operation !== "=") displayedResult += operation;

  const displayedExpression = `${Number(state.operandStr1)} ${
    state.operation
  } ${state.operandStr2} = ${result}`;

  return {
    ...state,
    operandStr1,
    operandStr2: "",
    displayedResult,
    displayedExpression,
    operation,
  };
};
function calcReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case CALC_ACTIONS.CLEAR:
      return INITIAL_STATE;

    case CALC_ACTIONS.TOGGLE_PHONE:
      return { ...state, isOn: !state.isOn };

    case CALC_ACTIONS.TYPE: {
      const digitOrPoint = payload;
      return handleTyping({ state, digitOrPoint });
    }

    case CALC_ACTIONS.OPERATE: {
      const operation = payload;

      return handleOperation({ state, operation });
    }
  }
}

const calc = ({ n1, n2, operation }) => {
  const value1 = Number(n1);
  const value2 = Number(n2);

  const result = operate({
    operation,
    recentValue: value1,
    currentValue: value2,
  });

  return result;
};
function App() {
  const [state, dispatch] = useReducer(calcReducer, INITIAL_STATE);

  const applyOperation = (operation) => {
    dispatch({ type: CALC_ACTIONS.OPERATE, payload: operation });
  };

  const addDigitOrPoint = (value) => {
    dispatch({ type: CALC_ACTIONS.TYPE, payload: value });
  };
  const toggleIsOn = () => {
    dispatch({ type: CALC_ACTIONS.TOGGLE_PHONE });
  };
  const clearCalc = () => {
    dispatch({ type: CALC_ACTIONS.CLEAR });
  };
  return (
    <div className={`calculator ${state.isOn && "on"}`}>
      <SwitchBtn isOn={state.isOn} setIsOn={toggleIsOn} />
      <div className={`wrapper ${state.isOn && "on"}`}>
        <div className="black-spot"></div>
        <Afficher className="expression">{state.displayedExpression}</Afficher>
        <Afficher>{state.displayedResult}</Afficher>

        <BtnNumber
          className={"clear-btn special-btn"}
          label={"c"}
          action={clearCalc}
        />
        <BtnNumber
          className={"special-btn"}
          label={"/"}
          actionParam={"/"}
          action={applyOperation}
        />
        <BtnNumber
          className={"special-btn"}
          label={"x"}
          actionParam={"x"}
          action={applyOperation}
        />
        <BtnNumber label={7} action={addDigitOrPoint} />
        <BtnNumber label={8} action={addDigitOrPoint} />
        <BtnNumber label={9} action={addDigitOrPoint} />
        <BtnNumber
          className={"special-btn"}
          label={"-"}
          actionParam={"-"}
          action={applyOperation}
        />
        <BtnNumber label={4} action={addDigitOrPoint} />
        <BtnNumber label={5} action={addDigitOrPoint} />
        <BtnNumber label={6} action={addDigitOrPoint} />
        <BtnNumber
          className={"special-btn"}
          label={"+"}
          actionParam={"+"}
          action={applyOperation}
        />
        <BtnNumber label={1} action={addDigitOrPoint} />
        <BtnNumber label={2} action={addDigitOrPoint} />
        <BtnNumber label={3} action={addDigitOrPoint} />
        <BtnNumber
          className={"special-btn equals"}
          label={"="}
          actionParam={"="}
          action={applyOperation}
        />
        <BtnNumber
          className={"special-btn"}
          label={"%"}
          actionParam={"%"}
          action={applyOperation}
        />
        <BtnNumber label={0} action={addDigitOrPoint} />
        <BtnNumber label={"."} action={addDigitOrPoint} />
      </div>
    </div>
  );
}

export default App;

const operate = ({ operation, recentValue, currentValue }) => {
  switch (operation?.trim()) {
    case "+":
      return recentValue + currentValue;
    case "-":
      return recentValue - currentValue;
    case "x":
      return recentValue * currentValue;
    case "/":
      return recentValue / currentValue;
    case "%":
      return recentValue % currentValue;
  }
};
