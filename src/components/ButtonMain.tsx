interface ButtonMainProps {
  onClick: () => void;
  title: string;
  bgColor: string;
}
export default function ButtonMain(props: ButtonMainProps) {
  return (
    <button
      id="next-btn"
      className={`btn w-full rounded-b-lg text-white font-bold py-2 px-4 uppercase cursor-pointer shadow-sm ${props.bgColor}`}
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
}
