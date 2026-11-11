import LegacyIcon from "../../../components/common/LegacyIcon";

export default function StepHeader({ icon, badge, children, lead }) {
  return <div className="sh rv"><span className="badge"><LegacyIcon name={icon} />{badge}</span><h2 className="title">{children}</h2>{lead ? <p className="lead">{lead}</p> : null}</div>;
}
