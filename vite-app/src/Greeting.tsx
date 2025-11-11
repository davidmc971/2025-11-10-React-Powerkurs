import type React from "react";

type GreetingProps = {
  name: string;
};

export default function Greeting(props: GreetingProps) {
  return <h1>Hello, {props.name}!</h1>;
}

export function Heading({ children }: React.PropsWithChildren) {
  return <h1>{children}</h1>;
}

/**
 * const name = "World";
 * 
 * return <Greeting name={name} />
 * 
 * <Heading>Hello, World!</Heading>
 */