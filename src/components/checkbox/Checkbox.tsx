import {
  Children,
  cloneElement,
  Dispatch,
  FC,
  Fragment,
  memo,
  ReactNode,
  SetStateAction,
  useMemo,
} from "react";
import CSS from "csstype";

import { BsCheck2 } from "react-icons/bs";
import classNames from "classnames";

type IColor =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";
interface Props {
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
}
interface ICheckbox extends Props {
  children: ReactNode;
}
interface ILabel {
  children: ReactNode;
  setChecked?: Dispatch<SetStateAction<boolean>>;
  className?: string;
}
interface IInputCheckbox {
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: CSS.Properties;
  checked?: boolean;
  setChecked?: Dispatch<SetStateAction<boolean>>;
  onClick?: () => void;
  component?: JSX.Element;
  color?: IColor;
}
const Checkbox: FC<ICheckbox> = ({ children, checked, setChecked }) => {
  const allChildren = Children.map(children, (child: any) => {
    if (child.type !== LabelCheckbox && child.type !== InputCheckbox)
      return null;

    const clone = cloneElement(child, {
      checked,
      setChecked,
    });
    return clone;
  });
  return <Fragment>{allChildren}</Fragment>;
};

export const InputCheckbox = memo(({
  checked,
  setChecked,
  className,
  size = "sm",
  style,
  onClick,
  component,
  color = "primary",
}: IInputCheckbox) => {
  const bgBtn = useMemo(() => ({
    primary: "bg-blue-600",
    secondary: "bg-purple-600",
    success: "bg-green-500",
    danger: "bg-red-600",
    warning: " bg-yellow-500",
    info: "bg-blue-400 ",
    light: " bg-gray-200 ",
    dark: "bg-gray-800",
  }),[])
  return (
    <div
      onClick={() => {
        onClick && onClick();
        if (setChecked) setChecked((state) => !state);
      }}
      style={style}
      className={classNames(
        className,
        `rounded-sm cursor-pointer transition-colors relative overflow-hidden flex justify-center items-center ${
          checked ? bgBtn[color] : "bg-slate-200"
        }`,
        {
          "w-4 h-4": size === "sm",
          "w-6 h-6": size === "md",
          "w-8 h-8": size === "lg",
          "border-2 border-gray-400 hover:bg-transparent hover:border-slate-700 hover:border-2":
            !checked,
        }
      )}
    >
      {checked && (component ? component : <BsCheck2 color="#fff" />)}
    </div>
  );
})
export const LabelCheckbox = memo(({ setChecked, className, children }: ILabel) => {
  return (
    <label
      className={classNames(className, "select-none cursor-pointer")}
      onClick={() => {
        setChecked && setChecked((state) => !state);
      }}
    >
      {children}
    </label>
  );
})

export default Checkbox;