import "./styles.css";

export type TLight = "left" | "center" | "right";

function Light({ active, position }: { active: boolean; position: TLight }) {
  return <div className={active ? `light light_${position}` : undefined}></div>;
}

export default Light;
