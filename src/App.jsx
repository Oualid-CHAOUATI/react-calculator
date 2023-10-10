import { useState } from "react";
import "./App.scss";
import { BtnNumber } from "./Components/BtnNumber/BtnNumber";
import Afficher from "./Components/Afficheur/Afficheur";
import { SwitchBtn } from "./Components/SwitchBtn/SwitchBtn";

function App() {
  const [typingNumberString1, setTypingNumberString1] = useState("");
  const [typingNumberString2, setTypingNumberString2] = useState("");
  const [valueToDisplay, setValueToDisplay] = useState("");
  const [stateOperator, setStateOperator] = useState(null);
  const [expression, setExpression] = useState("");
  const [isOn, setIsOn] = useState(true);
  const concatNumber = (number) => {
    //dernier opérateur = "=" et que on clique sur un chiffre => nouveau calcul
    if (stateOperator === "=") {
      setTypingNumberString2("");
      setStateOperator(null);

      setTypingNumberString1(`${number}`);
      setValueToDisplay(`${number}`);
      return;
    }
    // ---------------------------

    //y'a pas d'opérateur ? => on est entrain de saisir le premier nombre
    if (stateOperator === null) {
      addToNumber1(number);

      //sinon on ets entrain de saisir le deuxième nombre
    } else {
      addToNumber2(number);
    }

    setValueToDisplay((v) => `${v}${number}`);
  };

  const addToNumber1 = (number) =>
    addToNumber({ setter: setTypingNumberString1, number });

  const addToNumber2 = (number) =>
    addToNumber({ setter: setTypingNumberString2, number });

  const addToNumber = ({ setter, number }) => {
    setter((v) => `${v}${number}`);
  };

  const calc = () => {
    const value1 = Number(typingNumberString1);
    const value2 = Number(typingNumberString2);

    const result = operate({
      operator: stateOperator,
      recentValue: value1,
      currentValue: value2,
    });

    return result;
  };

  const clear = () => {
    setTypingNumberString1("");
    setTypingNumberString2("");
    setValueToDisplay("");
    setExpression("");
    setStateOperator(null);
  };

  const applyOperator = (operator) => {
    //nombre 1 pas saisi ? on accepte que + - et =
    // = parceque  (-1=)==(n1="" n2="1" et op = '-' )

    if (typingNumberString1 == "" && !"+-=".includes(operator)) return;

    // on a pas saisi de deuxième nombre ?
    if (typingNumberString2 === "") {
      setStateOperator(operator);
      //la première saisie remplira le 2 eme nombre vu qu'on a définit un opérateur => premire nombre sera évalué à 0 avecNumber("")

      setValueToDisplay(`${typingNumberString1} ${operator} `);
      // }

      return;
    }

    //else : le 2 ème nombre est saisi
    // opérateur logique ou '='
    setStateOperator(operator);

    //calcul sera effectué avec l'opérateur précédent
    const result = calc();

    setTypingNumberString1(result);
    setTypingNumberString2("");

    let valueToDisplay = result;
    if (operator !== "=") valueToDisplay += ` ${operator}`;
    setValueToDisplay(valueToDisplay);

    // operateur=- => nouvelle saisie = modifier n2 ET n1 reste =""
    //---> donc evite d'afficher l'expressin
    if (typingNumberString1 !== "")
      setExpression(
        `${Number(typingNumberString1)} ${stateOperator} ${Number(
          typingNumberString2
        )} = ${result}`
      );
  };

  return (
    <div className={`calculator ${isOn && "on"}`}>
      <SwitchBtn isOn={isOn} setIsOn={setIsOn} />
      <div className={`wrapper ${isOn && "on"}`}>
        <div className="black-spot"></div>
        <Afficher className="expression">{expression}</Afficher>
        <Afficher>{valueToDisplay}</Afficher>

        <BtnNumber
          className={"clear-btn special-btn"}
          label={"c"}
          action={clear}
        />
        <BtnNumber
          className={"special-btn"}
          label={"/"}
          action={() => applyOperator("/")}
        />
        <BtnNumber
          className={"special-btn"}
          label={"x"}
          action={() => applyOperator("x")}
        />
        <BtnNumber label={7} action={concatNumber} />
        <BtnNumber label={8} action={concatNumber} />
        <BtnNumber label={9} action={concatNumber} />
        <BtnNumber
          className={"special-btn"}
          label={"-"}
          action={() => applyOperator("-")}
        />
        <BtnNumber label={4} action={concatNumber} />
        <BtnNumber label={5} action={concatNumber} />
        <BtnNumber label={6} action={concatNumber} />
        <BtnNumber
          className={"special-btn"}
          label={"+"}
          action={() => applyOperator("+")}
        />
        <BtnNumber label={1} action={concatNumber} />
        <BtnNumber label={2} action={concatNumber} />
        <BtnNumber label={3} action={concatNumber} />
        <BtnNumber
          className={"special-btn equals"}
          label={"="}
          action={() => applyOperator("=")}
        />
        <BtnNumber
          className={"special-btn"}
          label={"%"}
          action={() => applyOperator("%")}
        />
        <BtnNumber label={0} action={concatNumber} />
        <BtnNumber label={"."} action={concatNumber} />
      </div>
    </div>
  );
}

export default App;

const operate = ({ operator, recentValue, currentValue }) => {
  switch (operator?.trim()) {
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

// const isAnOperator = (x) => {
//   if ("+-*/".includes(x)) return true;
//   return false;
// };
