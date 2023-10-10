import "./SwitchBtn.styles.scss";
export function SwitchBtn({ isOn, setIsOn }) {
  return (
    <button
      className={`switch-btn ${isOn && "on"}`}
      onClick={() => {
        setIsOn((v) => !v);
      }}
    >
      <span className="off-label">Off</span>
      <span className="on-label">On</span>
    </button>
  );
}
